import React from "react";
import "./Search.css";
import "../css/icons.css";
import "../fonts/fonts.css";
import Navbar from "../components/Navbar/Navbar";
import pokepediaLogo from "../images/logo.png";

const Search = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-lg-6 main-content">
                        <div className="logo">
                            <img src={pokepediaLogo} alt="Poképedia logo" />
                        </div>
                        <div className="search-bar text-center input-group">
                            <input type="text" placeholder="Ricerca per Pokémon, abilità, mossa, strumento o bacca..." className="form-control input-fields input-group-text-left fs-5" />
                            <span className="input-group-text input-group-text-right"><i className="bi bi-search fs-4"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search