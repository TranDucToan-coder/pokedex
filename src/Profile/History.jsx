import { useContext, useEffect, useState } from "react";
import style from "../Css/Information.module.css"
import { HistoryOrder } from "../API/api";

const History = () => {
    const userLogin = JSON.parse(sessionStorage.getItem("user"));
    const [history, setHistory] = useState([]);
    useEffect(() => {
        if(userLogin){
            const getData = async() => {
            const data = await HistoryOrder(userLogin.ID)
            setHistory(data);
        }
        getData();}
    },[userLogin.ID])
    return (
        <div>
            {userLogin ? (
                <div className={style.information_wrapper}>
                    <h3>History: </h3>
                    <p>Display your product when you buying at store!</p>
                    <table className={style.history_table}>
                        <tr>
                            <th>Time</th>
                            <th>ID</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    {history ? history.map((item, index) => (
                        <tr key={index}>
                            <td>{item?.OrderDate.slice(0, 10)}</td>
                            <td>{item?.ID}</td>
                            <td>{item?.Price}</td>
                            <td>Detail</td>
                        </tr>
                    )) : (
                        <div>No history</div>
                    )}
                    </table>
                </div>
            ) : (
                <div>No access to accept</div>
            )}
        </div>
    )
}
export default History