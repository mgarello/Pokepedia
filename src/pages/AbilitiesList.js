import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import AbilityElement from "../components/AbilityElement/AbilityElement";
import BackToTopButton from "../components/BackToTopButton/BackToTopButton";
import ShowMoreButton from "../components/ShowMoreButton/ShowMoreButton";
import Loader from "../components/Loader/Loader";
import "../css/style.css";
import Wallpaper from "../images/pokemon.png";

const AbilitiesList = () => {
    // loader
    const [isLoading, setIsLoading] = useState(true);

    // valori di offset e limite per la chiamata all'API - uso stati così si aggiorna il componente
    const limite = 99;
    const [offset, setOffset] = useState(0);
    const [isFull, setIsFull] = useState(false);
    const [abilities, setAbilities] = useState([]);

    useEffect(()=> {
        const scarica = () => {
            fetch("https://pokeapi.co/api/v2/ability?limit=" + limite + "&offset=" + offset)
            .then(dati => dati.json())
            .then((elenco) => {
                setAbilities([...abilities, ...elenco.results]);
                // se ho mostrato tutti gli elementi nascondo il pulsante per avanzare
                if (elenco.next === null) {
                    setIsFull(true);
                }
                setIsLoading(false);
            });
        }
        scarica();
    }, [offset]);

    const clickHandler=()=> {
        // aumento l'offset
        setOffset(offset + limite);
    }

    document.title = "Elenco abilità - Poképedia";

    return (
        <div style={{backgroundImage: `url(${Wallpaper})`}} className="bg-image-centered">
            <Navbar />
            {isLoading && <Loader />}
            <div className="container mt-3">
                <div className="row justify-content-center align-items-center g-2">
                    {abilities.map(({name, url})=> {
                        return <AbilityElement name={name} url={url} />
                    })}
                </div>
                {(!isFull) && <ShowMoreButton text="Carica altre abilità" functionName={clickHandler} />}
                <BackToTopButton />
            </div>
        </div>
    )
}

export default AbilitiesList