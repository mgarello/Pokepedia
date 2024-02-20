import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import "../css/icons.css";
import "../fonts/fonts.css";
import Navbar from "../components/Navbar/Navbar";
import Loader from "../components/Loader/Loader";
import pokepediaLogo from "../images/logo.png";
import Swal from "sweetalert2";

const Search = () => {
    // loader
    const [isLoading, setIsLoading] = useState(false);

    const searchBar = useRef();
    const navigate = useNavigate();
    // URL per chiamata all'API
    const APIURL = "https://pokeapi.co/api/v2/pokemon/";

    // cerco per il dato fornito nella barra di ricerca
    const cercaPkmn = async () => {
        setIsLoading(true);
        // prendo il contenuto della casella di ricerca e lo "purifico"
        let inser = searchBar.current.value.trim().toLowerCase().replaceAll(" ", "-");

        await fetch(APIURL + inser)
            .then((response) => {
                if (response.status >= 400 && response.status < 600) {
                    throw new Error("Non è stato trovato alcun Pokémon con i criteri inseriti.");
                } else {
                    inser = inser[0].toUpperCase() + inser.slice(1);
                    // l'API mi restituisce qualcosa --> rimando alla pagina corrispondente
                    navigate("/Pokemon/" + inser);
                    // pulisco il contenuto della barra
                    searchBar.current.value = "";
                }
                return response;
            }).catch((error) => {
                setIsLoading(false);
                console.log(error);
                Swal.fire({
                    icon: "warning",
                    title: "Attenzione!",
                    text: "Impossibile caricare le informazioni del Pokémon cercato, controllare la correttezza del nome o del numero inserito e riprovare"
                });
            });
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.target.blur();
            cercaPkmn();
        }
    }

    return (
        <>
            <Navbar />
            {isLoading && <Loader />}
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-lg-6 main-content">
                        <div className="logo">
                            <img src={pokepediaLogo} alt="Poképedia logo" />
                        </div>
                        <div className="text-center">
                            <form onKeyDown={handleKeyDown}>
                                <div className="search-bar text-center input-group">
                                    <input ref={searchBar} type="text" placeholder="Cerca Pokémon per nome o numero" className="form-control input-fields input-group-text-left fs-5" />
                                    <span className="input-group-text input-group-text-right" onClick={cercaPkmn}><i className="bi bi-search fs-4"></i></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search