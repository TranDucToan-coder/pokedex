import React from "react";
import "../Css/navigate.css"
//Image
const Home = "/svgMenu/pikachu.webp";
const Pokedex = "/svgMenu/pokeball.png";

const Navigate = () => {
    const navItems = [
        { name: "Home", image: Home },
        { name: "Pokedex", image: Pokedex },
        { name: "Video Games & Apps" },
        { name: "Trading Card Game" },
        { name: "Animation" },
        { name: "Play! Pokémon Events" },
        { name: "News" }
    ];
    return (
        <div id="wrapper">
            {navItems.map((item, index) => (
                <div key={index} className="item">
                    <img src={item.image} alt="none" id="image_navigate"></img>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    )

}
export default Navigate