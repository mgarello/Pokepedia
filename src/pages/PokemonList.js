import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import PokemonElement from "../components/PokemonElement/PokemonElement";
import BackToTopButton from "../components/BackToTopButton/BackToTopButton";
import ShowMoreButton from "../components/ShowMoreButton/ShowMoreButton";
import Loader from "../components/Loader/Loader";
import "../css/style.css";
import Wallpaper from "../images/pokemon.png";

const PokemonList = () => {
    // loader
    const [isLoading, setIsLoading] = useState(true);

    // valori di offset e limite per la chiamata all'API - uso stati così si aggiorna il componente
    const limite = 99;
    const [offset, setOffset] = useState(0);
    const [isFull, setIsFull] = useState(false);
    const [pokemon, setPokemon] = useState([]);

    useEffect(()=> {
        const scarica = () => {
            fetch("https://pokeapi.co/api/v2/pokemon?limit=" + limite + "&offset=" + offset)
            .then(dati => dati.json())
            .then((elenco) => {
                setPokemon([...pokemon, ...elenco.results]);
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

    document.title = "Elenco Pokémon - Poképedia";

    return (
        <div style={{backgroundImage: `url(${Wallpaper})`}} className="bg-image-centered">
            <Navbar />
            {isLoading && <Loader />}
            <div className="container mt-3">
                <div className="row justify-content-center align-pokemon-center g-2">
                    {pokemon.map(({name, url})=> {
                        return <PokemonElement image={url} name={name} />
                    })}
                </div>
                {(!isFull) && <ShowMoreButton text="Carica altri Pokémon" functionName={clickHandler} />}
                <BackToTopButton />
            </div>
        </div>
    )
}

export default PokemonList