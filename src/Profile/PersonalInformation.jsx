import { useContext, useEffect, useState } from "react";
import style from "../Css/Information.module.css"
import { GetDetailUser } from "../API/api";

const Information = () => {
    const userLogin = JSON.parse(sessionStorage.getItem("user"));
    const [user, setUser] = useState([]);
    useEffect(() => {
        const getInformation = async() => {
            const data = await GetDetailUser(userLogin.user.ID)
            setUser(data)
        } 
        getInformation();
    }, [userLogin.user.ID])
    return(
        <div>
            {user ? (
                <div className={style.information_wrapper}>
                    <h3>Hello: {user?.fullname}</h3>
                    <div className={style.input}><p>Username: </p><input type="text" disabled value={user?.username}></input></div>
                    <div className={style.input}><p>Password: </p><input type="password" disabled value={user?.password}></input></div>
                    <div className={style.input}><p>Address: </p><input type="text" disabled value={user?.addrerss}></input></div>
                    <div className={style.input}><p>Phone: </p><input type="text" disabled value={user?.phone}></input></div>
                </div>
            ) : (
                <div>No access to accept</div>
            )}
        </div>
    )
}
export default Information