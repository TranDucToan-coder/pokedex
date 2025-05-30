import React from "react";
import "../Css/home.css"

const Home = () => {
    return (
        <div id="content">
            <div className="main-content">
                <div className="post-1">
                    <img className="img-main-post-1" src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/tcg-pocket/2025/05/22/pokemon-tcg-pocket-169-en.png`} loading="lazy"></img>
                    <div className="title">
                        <h3>Ultra Beasts Have Arrived in <em>Extradimensional Crisis</em></h3>
                        <p>These bizarre beings have emerged from Ultra Space in Pokémon&nbsp;TCG Pocket’s newest expansion.</p>
                    </div>
                </div>
                <div className="below-main-content">
                    <div className="post-2">
                        <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/_tiles/sv/sv10/preview-cards/sv10-preview-cards-3-169-en.png" loading="lazy"></img>
                        <div className="title">
                            <h4>Garchomp with the Mightiest Mark Is Coming</h4>
                        </div>
                    </div>
                    <div className="post-3">
                        <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/_tiles/sv/sv10/preview-cards/sv10-preview-cards-3-169-en.png" loading="lazy"></img>
                        <div className="title">
                            <h4>Watch the Latest Pokémon Presents on July 22, 2025</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sub-content">
                <div className="post-1">
                    <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/_tiles/sv/sv10/preview-cards/sv10-preview-cards-3-169-en.png" loading="lazy"></img>
                    <div className="title">
                        <h4>Preview Five Team Rocket’s Cards from Pokémon TCG: Scarlet & Violet—Destined Rivals</h4>
                    </div>
                </div>
                <div className="post-2">
                    <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/misc/_tiles/pokemon-center/2025/05/28/pokemon-center-169.png" loading="lazy"></img>
                    <div className="title">
                        <h4>Join the Mega Celebration at Pokémon Center</h4>
                    </div>
                </div>
                <div className="post-3">
                    <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/pokemon-legends-z-a/2025/05/28/pokemon-legends-z-a-34-en.png" alt="none" loading="lazy" />
                    <div className="title">
                        <h4>POKEMON Legends: <em>Z-A</em> Updates</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home