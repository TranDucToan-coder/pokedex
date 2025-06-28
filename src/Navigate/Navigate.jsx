import React, { useContext } from "react";
import style from "../Css/Navigate.module.css"
import { Link } from "react-router-dom";
//Context
import { ThemeContext } from "../Context/Login";
//Image
const Home = "/svgMenu/Home.svg";
const Pokedex = "/svgMenu/Pokedex.svg";
const Games = "/svgMenu/Games.svg";
const TCG = "/svgMenu/TCG.svg"

const Navigate = () => {
    const navItems = [
        { name: "Home", image: Home, link: "/" },
        { name: "Pokedex", image: Pokedex, link: "/pokedex" },
        { name: "Video Games & Apps" , image: Games},
        { name: "Trading Card Game" , image: TCG, link: "/TCG"},
        { name: "Animation" },
        { name: "Play! Pokémon Events" },
        { name: "News" }
    ];
    return (
            <div id={style.wrapper}>
                {navItems.map((item, index) => (
                    <div key={index} className={style.item}>
                        <Link to={item.link} className={style.link}>
                            <img src={item.image} alt="none" id={style.image_navigate}></img>
                            <p>{item.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
    )

}
export default Navigate