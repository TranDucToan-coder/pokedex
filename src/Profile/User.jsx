import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/Login";
import style from "../Css/User.module.css"
//component
import Information from "./PersonalInformation";
import History from "./History";

const User = () => {
    const { setUser } = useContext(LoginContext);
    const navigate = useNavigate();
    const [nav, setNav] = useState("information")
    const HandleClickLogOut = () => {
        setUser({});
        sessionStorage.removeItem("user");
        navigate("/");
    };
    return (
        <div className={style.wrapper}>
            <div className={style.left}>
                <ul className={style.user_sidebar}>
                    <li onClick={() => setNav("information")}>Personal information</li>
                    <li onClick={() => setNav("history")}>History</li>
                    <li><button onClick={() => HandleClickLogOut()}>Log out</button></li>
                </ul>
            </div>
            <div className={style.right}>
                <div className={style.user_content}>
                    {nav === "information" ? (
                        <Information/>
                    ) : (
                        <History/>
                    )}
                </div>
            </div>
            
        </div>
    );
};
export default User;
