import { useContext, useEffect, useState } from "react";
import style from "../Css/Information.module.css"
import { GetDetailUser } from "../API/api";

const Information = () => {
    const userLogin = JSON.parse(sessionStorage.getItem("user"));
    const [user, setUser] = useState({});

    const handleChangePass = (e) => {
        const value = e.target.value;
        setUser({...user, password : value})
    }
    const handleChangeFullname = (e) => {
        const value = e.target.value;
        setUser({...user, fullname : value})
    }
    const handleChangeAddress = (e) => {
        const value = e.target.value;
        setUser({...user, addrerss : value})
    }
    const handleChangePhone = (e) => {
        const value = e.target.value;
        setUser({...user, phone : value})
    }
    useEffect(() => {
        if(userLogin.ID){
            const getInformation = async() => {
                const data = await GetDetailUser(userLogin.ID)
                setUser(data)

        } 
        getInformation();
        }
    }, [userLogin.ID])
    return(
        <div>
            {userLogin ? (
                <div className={style.information_wrapper}>
                    <h3>Hello: {user?.fullname}</h3>
                    <div className={style.input}><p>Username: </p><input type="text" disabled value={user?.username}></input></div>
                    <div className={style.input}><p>Password: </p><input type="password" value={user?.password}
                    onChange={(e) => handleChangePass(e)}></input></div>
                    <div className={style.btnContent}>
                        <button className={style.btnSave}>Save</button>
                    </div>
                    <h3>Information</h3>
                    <div className={style.input}><p>Fullname: </p><input type="text"
                    onChange={(e) => handleChangeFullname(e)} value={user?.fullname}></input></div>
                    <div className={style.input}><p>Address: </p><input type="text"
                    onChange={(e) => handleChangeAddress(e)} value={user?.addrerss}></input></div>
                    <div className={style.input}><p>Phone: </p><input type="text" 
                    onChange={(e) => handleChangePhone(e)} value={user?.phone}></input></div>
                    <div className={style.btnContent}>
                        <button className={style.btnSave}>Save</button>
                    </div>
                </div>
            ) : (
                <div>No access to accept</div>
            )}
        </div>
    )
}
export default Information