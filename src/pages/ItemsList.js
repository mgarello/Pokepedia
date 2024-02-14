import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import ItemElement from "../components/ItemElement/ItemElement";
import BackToTopButton from "../components/BackToTopButton/BackToTopButton";
import ShowMoreButton from "../components/ShowMoreButton/ShowMoreButton";

const ItemsList = () => {
    // valori di offset e limite per la chiamata all'API - uso stati così si aggiorna il componente
    const limite = 99;
    const [offset, setOffset] = useState(0);
    const [isFull, setIsFull] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(()=> {
        const scarica = () => {
            fetch("https://pokeapi.co/api/v2/item?limit=" + limite + "&offset=" + offset)
            .then(dati => dati.json())
            .then((elenco) => {
                setItems([...items, ...elenco.results]);
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
                <div className="row justify-content-center align-items-center g-2">
                    {items.map(({name, url})=> {
                        return <ItemElement name={name} url={url} />
                    })}
                </div>
                {(!isFull) ? <ShowMoreButton text="Carica altri strumenti" functionName={clickHandler} /> : console.log()}
                <BackToTopButton />
            </div>
        </>
    )
}

export default ItemsList