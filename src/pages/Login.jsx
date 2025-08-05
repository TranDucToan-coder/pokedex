import { React, useState, useEffect, useContext, useRef } from "react";
import style from '../Css/LoginForm.module.css'
import style1 from '../Css/OTP.module.css'
//Context
import { ErrContext, LoginContext, StateContext } from "../Context/Login";
import { VerifyOTP } from "../API/api";

export const OTP = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const { stateOTP, HandleChangeOTP } = useContext(StateContext);
    const {error, HandleChangeError, setError} = useContext(ErrContext);
    const {user} = useContext(LoginContext);
    const inputRefs = useRef([]);
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        } else {
            e.target.value = "";
        }
    };
    const CheckValue = async () => {
        const enteredOTP = otp.join('');
        if (otp.join('').length !== 6 || isNaN(enteredOTP)) {
            setError("Vui lòng nhập đủ 6 số OTP");
            return;
        }
        try {
            const result = await VerifyOTP(enteredOTP);
            console.log(result)
            if (result && result.message === "OTP verified") {
                setError("");
                console.log("✅ OTP hợp lệ, đăng nhập thành công!");
                sessionStorage.setItem("user", JSON.stringify(user));
                HandleChangeOTP();
            } else {
                setError("Sai mã số, vui lòng nhập lại");
                console.log("False");
            }
        } catch (err) {
            setError("Lỗi xác thực OTP, vui lòng thử lại");
            console.error("OTP verify error:", err);
        }
    }
    return (
        <>
            {
                stateOTP === true && (
                    <div className={style1.overlay}>
                        <div className={style1.wrapper}>
                            <section className={style1.close}>
                                <p onClick={() => HandleChangeOTP()}>X</p>
                            </section>
                            <p className={style1.title}>OTP</p>
                            <div className={style1.content}>
                                {otp.map((item, index) => (
                                    <input type="text" maxLength={1} key={index}
                                        value={otp[index]}
                                        className={style1.item}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        onChange={(e) => handleChange(e, index)}>
                                    </input>
                                ))}
                            </div>
                            <div className={style1.submit}>
                                <p>Resend?</p>
                                <button className={style1.button} onClick={() => CheckValue()}>Authenticate</button>
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>)
            }
        </>
    )
}
export const LoginForm = () => {
    const { state, HandleChangeState, HandleChangeOTP } = useContext(StateContext);
    const { error, setError} = useContext(ErrContext)
    const {HandleClickBtn, setUser, user} = useContext(LoginContext)
    return (
        <>
            {state === true && (
                <div className={style.overlay}>
                    <div id={style.wrapper}>
                        <section className={style.close}>
                            <p onClick={() => HandleChangeState()}>X</p>
                        </section>
                        <section className={style.topPart}>
                            <p>Username: </p>
                            <input type="text" value={user?.username} onChange={(e) => setUser({ ...user, username: e.target.value })} ></input>
                        </section>
                        <section className={style.topPart}>
                            <p>Password: </p>
                            <input type="password" value={user?.password} onChange={(e) => setUser({ ...user, password: e.target.value })} ></input>
                        </section>
                        <section className={style.middlePart}>
                            <p>Forgot password?</p>
                        </section>
                        <section className={style.bottomPart}>
                            <button onClick={() => {
                                HandleClickBtn()
                            }}>Log in</button>
                            <p>{error}</p>
                            <p>Have not account yet?</p>
                        </section>
                    </div>
                </div>
            )}
        </>
    )
}
