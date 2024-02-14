import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import PokemonElement from "../components/PokemonElement/PokemonElement";
import BackToTopButton from "../components/BackToTopButton/BackToTopButton";
import ShowMoreButton from "../components/ShowMoreButton/ShowMoreButton";

const PokemonList = () => {
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
            });
        }
        scarica();
    }, [offset]);

    const clickHandler=()=> {
        // aumento l'offset
        setOffset(offset + limite);
    }    

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <div className="row justify-content-center align-pokemon-center g-2">
                    {pokemon.map(({name, url})=> {
                        return <PokemonElement image={url} name={name} />
                    })}
                </div>
                {(!isFull) ? <ShowMoreButton text="Carica altri Pokémon" functionName={clickHandler} /> : console.log()}
                <BackToTopButton />
            </div>
        </>
    )
}

export default PokemonList