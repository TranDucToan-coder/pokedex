import { useEffect, useState } from "react"
import { getData, GetDataTCG } from "../API/api"
import style from "../Css/MainPage.module.css"

const MainPage = () => {
    const [number, setNumber] = useState([]);
    const [numberCard, setNumberCard] = useState([]);
    const data = async () => {
        const response =  (await getData()).length;
        const responseCard = (await GetDataTCG()).length;
        setNumber(response)
        setNumberCard(responseCard);
    }
    useEffect(() => {
        data()
    },[])
    return (
        <div className={style.wrapper}>
                <div className={style.item1}>Total pokemon: {number?.length}</div>
                <div className={style.item2}>Total TCG: {numberCard?.length}</div>
                <div className={style.item3}>c</div>
        </div>
    )
}
export default MainPage