import React, { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GetUser, GetOTP } from "../API/api";


export const LoginContext = createContext();
export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const { error, setError } = useContext(ErrContext);
    const { HandleChangeOTP, HandleChangeState } = useContext(StateContext)

    const HandleClickBtn = async () => {
        if (!user.username || !user.password) {
            setError("Không được để trống thông tin!");
            return;
        }
        try {
            const serverUser = await GetUser(user.username, user.password);
            if (!serverUser) {
                setError("Sai tài khoản hoặc mật khẩu!");
            } else {
                console.log("✅ Đăng nhập thành công, yêu cầu OTP...");
                setUser(serverUser.user);
                console.log(user)
                HandleChangeState();
                HandleChangeOTP();
                const checkOTP = await GetOTP(serverUser.user.email);
                console.log(checkOTP);
                if (checkOTP) {
                    console.log("OTP đã được gửi về mail!");
                } else {
                    console.log("Email chưa được cung cấp!");
                    return;
                }
            }
        } catch (err) {
            console.error("❌ Lỗi khi xác thực đăng nhập:", err);
            setError("Lỗi hệ thống, vui lòng thử lại sau.");
        }
    };

    return (
        <LoginContext.Provider value={{ user, setUser, HandleClickBtn }}>
            {children}
        </LoginContext.Provider>
    )
};

export const StateContext = createContext();
export const StateProvider = ({ children }) => {
    const [state, setState] = useState(false);
    const [stateOTP, setStateOTP] = useState(false);
    const HandleChangeState = () => {
        setState(!state);
    }
    const HandleChangeOTP = () => {
        setStateOTP(!stateOTP);
    }
    return (
        <StateContext.Provider value={{ state, stateOTP, HandleChangeState, HandleChangeOTP }}>
            {children}
        </StateContext.Provider>)
}

export const ErrContext = createContext();
export const ErrProvider = ({ children }) => {
    const [error, setError] = useState('');
    const HandleChangeError = (e) => {
        setError(e.target.value);
    }
    return (
        <ErrContext.Provider value={{ error, setError, HandleChangeError }}>
            {children}
        </ErrContext.Provider>
    )
}