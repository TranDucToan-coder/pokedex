import { useState, useEffect } from "react";
import style from '../Css/Pokedex.module.css'
import { getData } from "../API/api";
import Pagination from "../Paginated/Paginate";
import Paginate from "../Paginated/Pagination";
import { Link } from "react-router-dom";
const Pokedex = () => {
    const [expanded, setExpanded] = useState(false);
    const [data, setData] = useState([]);
    const HandleChangeButton = () => {
        setExpanded(!expanded);
    };
    const FetchData = async () => {
        try {
            const results = await getData();
            setData(results);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };
    const limit = 30;
    const [page, setPage] = useState(1);
    const { totalPages, paginated } = Paginate(data, page, limit);
    const SortData = (e) => {
        const cloneData = [...data];
        switch (e) {
            case "op1":
                cloneData.sort((a, b) => a.id - b.id);
                break;
            case "op2":
                cloneData.sort((a, b) => b.id - a.id);
                break;
            case "op3":
                cloneData.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "op4":
                cloneData.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }
        setData(cloneData)
    }
    useEffect(() => {
        FetchData();
    }, [])
    return (
        <div id={style.wrapper}>
            <p className={style.title}>POKEDEX</p>
            <div className={style.searchBox}>

            </div>
            <div className={style.advancedFilter}>
            </div>
            <div className={style.option}>
                <button className={style.BtnRandom}>Suprise Me!</button>
                <div className={style.sort}>
                    <p className={style.title}>Sort By</p>
                    <select className={style.listOption} onChange={(e) => SortData(e.target.value)}>
                        <option className={style.item} value="op1">Lowest number</option>
                        <option className={style.item} value="op2">Highest number</option>
                        <option className={style.item} value="op3">A-Z</option>
                        <option className={style.item} value="op4">Z-A</option>
                    </select>
                </div>
            </div>
            <div className={style.listItem}>
                {data.length > 0 ? (paginated.map((item, index) => (
                    <Link to={`/pokedex/${item.id}`} key={index}>
                        <div id={style.item}>
                            <img src={item.image} alt="none" loading="lazy"></img>
                            <div className={style.title}>
                                <p className={style.id}>#{item.id}</p>
                                <p className={style.name}>{item.name}</p>
                            </div>
                        </div>
                    </Link>
                ))
                ) : (
                    <div>Nodata</div>
                )}

            </div>
            <Pagination page={page} totalPages={totalPages} setPage={setPage}></Pagination>
        </div>
    )
}
export default Pokedex