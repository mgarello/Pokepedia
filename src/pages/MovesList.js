import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import MoveElement from "../components/MoveElement/MoveElement";
import BackToTopButton from "../components/BackToTopButton/BackToTopButton";
import ShowMoreButton from "../components/ShowMoreButton/ShowMoreButton";


const MovesList = () => {
    // valori di offset e limite per la chiamata all'API - uso stati così si aggiorna il componente
    const limite = 99;
    const [offset, setOffset] = useState(0);
    const [isFull, setIsFull] = useState(false);
    const [moves, setMoves] = useState([]);

    useEffect(()=> {
        const scarica = () => {
            fetch("https://pokeapi.co/api/v2/move?limit=" + limite + "&offset=" + offset)
            .then(dati => dati.json())
            .then((elenco) => {
                setMoves([...moves, ...elenco.results]);
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

    document.title = "Elenco mosse - Poképedia";

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <div className="row justify-content-center align-moves-center g-2">
                    {moves.map(({name, url})=> {
                        return <MoveElement image={url} name={name} />
                    })}
                </div>
                {(!isFull) ? <ShowMoreButton text="Carica altre mosse" functionName={clickHandler} /> : console.log()}
                <BackToTopButton />
            </div>
        </>
    )
}

export default MovesList