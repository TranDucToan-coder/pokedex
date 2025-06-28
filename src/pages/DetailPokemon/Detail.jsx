import { useEffect, useState } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { DetailPokemon, getData } from "../../API/api";
import style from "../../Css/Detail.module.css"

const DetailOfPokemon = () => {
    const [data, setData] = useState({});
    const [prevData, setPrevData] = useState({});
    const [nextData, setNextData] = useState({});
    const { id } = useParams();
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const pokemon = await DetailPokemon(id);
                setData(pokemon);
            } catch (error) {
                console.error("Error fetching Pokémon details:", error);
            }
        };
        const fetchListPokemon = async () => {
            try {
                if (id > 1) {
                    const prevPokemon = await DetailPokemon((parseInt(id) - 1).toString());
                    const nextPokemon = await DetailPokemon((parseInt(id) + 1).toString());
                    setNextData(nextPokemon);
                    setPrevData(prevPokemon);
                }
                else {
                    return
                }
            } catch (error) {
                console.error("Error fetching Pokémon:", error);
            }
        }
        fetchPokemon();
        console.log(data)
        if (id) {
            fetchListPokemon();
        }
    }, [id])
    return (
        <div className={style.wrapper}>
            <section className={style.name}>
                <p>{data.data?.name}</p>
            </section>
            <section className={style.wrapperVideo}>
                <iframe className={style.video} src="https://www.youtube.com/embed/JV3zw2uoJlE" autoPlay frameBorder="0" allowFullScreen></iframe>
            </section>
            <section className={style.content}>
                <div className={style.top}>
                    <div className={style.topLeft}>
                        {data.data?.id <= 1 ? (
                            <Link to={`/pokedex/${data.data?.id}`}><div>{data.data?.id}</div></Link>
                        ) : (
                            <Link to={`/pokedex/${data.data?.id - 1}`}>
                                <div>
                                    <p>{data.data?.id - 1}</p>
                                    <p>{prevData.data?.name}</p>
                                </div>
                            </Link>
                        )}</div>
                    <div className={style.topRight}>
                        {data.data?.id != null ? (
                            <Link to={`/pokedex/${data.data?.id + 1}`}>
                                <div>
                                    <p>{data.data?.id + 1}</p>
                                    <p>{nextData.data?.name}</p>
                                </div>
                            </Link>
                        ) : (
                            <Link to={`/pokedex/${data.data?.id + 1}`}>
                                <div>{data.data?.id + 1}</div>
                            </Link>
                        )}</div>
                </div>
                <div className={style.topMid}>
                    <strong>{data.data?.name}</strong>
                    <p>#{data.data?.id}</p>
                </div>
                <div className={style.mid}>
                    <div className={style.midLeft}>
                        <img className={style.image} src={data?.image} alt="none" loading="lazy"></img>
                    </div>
                    <div className={style.midRight}>
                        <p>{data.description?.flavor_text_entry?.flavour_text}</p>
                        <div className={style.attribute}>
                            <p className={style.weight}><span>Weight: </span>{data.data?.weight} lbs</p>
                            <p className={style.height}><span>Height: </span> {data.data?.height}''</p>
                            <div className={style.abilities}><span>Abilities: </span>{data.data?.abilities.map((item, index) => (
                                <p key={index}>{item.ability?.name}</p>
                            ))}</div>
                            <p></p>
                        </div>
                        <div className={style.type}>
                            <p>Type</p>
                            <div className={style.borderType}>
                                {data.data?.types.map((item, index) => (
                                    <div key={index} className={style.typeItem}>{item.type?.name}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.bot}>
                    <div className={style.stat}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default DetailOfPokemon