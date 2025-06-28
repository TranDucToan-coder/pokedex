import { useContext } from "react";
import style from "../Css/Information.module.css"
import { LoginContext } from "../Context/Login";

const Information = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return(
        <div>
            {user ? (
                <div className={style.information_wrapper}>
                    <div><input type="text" disabled value={user.username}></input></div>
                    <div><input type="password" disabled value={user.password}></input></div>
                    <div><input type="text" disabled value={user.address}></input></div>
                    <div><input type="text" disabled value={user.phone}></input></div>
                </div>
            ) : (
                <div>No access to accept</div>
            )}
        </div>
    )
}
export default Information