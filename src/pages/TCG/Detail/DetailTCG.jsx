import { useState, useEffect } from "react";
import { GetDetailTCG } from "../../../API/api";
import { Link, useParams } from "react-router-dom";
import addItemToCart from "../../Cart/AddItem"
import style from "../../../Css/DetailTCG.module.css"

export const Elemental = [
    { name: "fire", image: "/elements/fire.png" },
    { name: "dark", image: "/elements/dark.png" },
    { name: "earth", image: "/elements/earth.png" },
    { name: "Lightning", image: "/elements/electric.png" },
    { name: "Fighting", image: "/elements/fighting.png" },
    { name: "Grass", image: "/elements/insec.png" },
    { name: "Colorless", image: "/elements/normal.png" },
    { name: "poison", image: "/elements/poison.png" },
    { name: "psycho", image: "/elements/psycho.png" },
    { name: "metal", image: "/elements/steel.png" },
    { name: "water", image: "/elements/water.png" },
]
const DetailTCG = () => {
    const [data, setData] = useState({});
    const { id } = useParams();

    const getData = async () => {
        const response = await GetDetailTCG(id);
        if (response) {
            console.log(response)
            setData(response);
        }
        else
            console.log("Can't get data about this card");
    }
    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id])
    const getElementImage = (attackName) => {
        const element = Elemental.find(el => attackName.toLowerCase().includes(el.name.toLowerCase()));
        return element ? element.image : "/elements/default.png";
    };
    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <div className={style.left}>
                    <img src={data.images?.small} className={style.image} loading="lazy"></img>
                    <div className={style.Optbutton}>
                        <Link to="/TCG"><button className={style.button}>Trở về trang chủ</button></Link>
                        <button className={style.button} onClick={() => addItemToCart(data)}>Mua hàng</button>
                    </div>
                </div>
                <div className={style.right}>
                    <div className={style.name}>
                        <p>{data?.name}</p>
                    </div>
                    <div className={style.subInf}>
                        <p>{data?.subtypes} {data?.supertype}</p>
                        <p>HP: {data?.hp}</p>
                    </div>
                    <div>
                        {data.attacks?.map((item, index) => (
                            <div key={index} className={style.cost}>
                                <div className={style.nameAbilities}>
                                    {item.cost?.map((costName, index) => (
                                        <img key={index} className={style.ImageCost} src={getElementImage(costName)} loading="lazy" />
                                    ))}
                                    <p className={style.abilities}>{item?.name}</p>
                                </div>
                                <p className={style.costText}>{item?.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className={style.stats}>
                        <div>
                            <p>Weakness</p>
                            <div className={style.weaknesses}>{data.weaknesses?.map((item, index) => (
                                <div key={index} className={style.value}>
                                    <img key={index} className={style.ImageCost} src={getElementImage(item?.type)} loading="lazy"></img>
                                    <p className={style.NumberValue}>{item?.value}</p>
                                </div>
                            ))}
                            </div>
                        </div>
                        <div>
                            <p>Resistance</p>
                            <div className={style.resistanceCost}>
                                {data.resistances?.map((item, index) => (
                                    <div key={index} className={style.RsValue}>
                                        <img key={index} className={style.ImageCost} src={getElementImage(item.type)} loading="lazy"></img>
                                        <p>{item?.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p>Retreat Cost</p>
                            <div className={style.retreatCost}>
                                {data.retreatCost?.map((item, index) => (
                                    <div key={index}>
                                        <img key={index} className={style.ImageCost} src={getElementImage(item)} loading="lazy"></img>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={style.rarity}>
                        <p>{data?.rarity}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p>Market</p>
                        <p>{data.cardmarket?.updatedAt}</p>
                        <table>
                            <tr>
                                <td>avgSellPrice: </td>
                                <td><strong>{data.cardmarket?.prices?.averageSellPrice}</strong></td>
                            </tr>
                            <tr>
                                <td>avg1/7/30: </td>
                                <td><strong>{data.cardmarket?.prices?.avg1}</strong>/
                                    <strong>{data.cardmarket?.prices?.avg7}</strong>/
                                    <strong>{data.cardmarket?.prices?.avg30}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>trendPrice: </td>
                                <td><strong>{data.cardmarket?.prices?.trendPrice}</strong></td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default DetailTCG