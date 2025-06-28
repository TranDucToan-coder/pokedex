import { useState, useEffect } from "react";
import { GetDataTCG } from "../../API/api";
import style from '../../Css/TCG.module.css'
import Paginate from "../../Paginated/Pagination";
import Pagination from "../../Paginated/Paginate";
import { Link } from "react-router-dom";

const TCG = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 9;
    const { totalPages, paginated } = Paginate(data, page, limit)
    const getData = async () => {
        const response = await GetDataTCG();
        setData(response);
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                {data.length > 1 ? (
                    paginated.map((item, index) => (
                        <Link to={`./${item.id}`}>
                            <div className={style.item} key={index}>
                                <img src={item.images.small} className={style.image}></img>
                                <p className={style.title}>{item.id}_{item.name}</p>
                            </div>
                        </Link>
                    ))) : (
                    <div className={style.item}>
                        <p>Loading</p>
                    </div>
                )
                }
            </div>
            <Pagination page={page} totalPages={totalPages} setPage={setPage}></Pagination>
        </div>)
}
export default TCG