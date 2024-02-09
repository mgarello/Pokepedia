import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import "./ItemsList.css";
import ItemElement from "../components/ItemElement/ItemElement";

const ItemsList = () => {
    const [ris, setRis] = useState([]);

    // back to top button
    const backToTopBtn = useRef();

    useEffect(() => {
        const scrollFunction = () => {
            const btnStyle = backToTopBtn.current && backToTopBtn.current.style;

            if (btnStyle) {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    btnStyle.display = "flex";
                } else {
                    btnStyle.display = "none";
                }
            }
        };

        // Add the scroll event listener
        window.addEventListener('scroll', scrollFunction);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', scrollFunction);
        };
    }, []); // Empty dependency array means this effect runs once after initial render

    // When the user clicks on the button, scroll to the top of the document
    const topFunction = () => {
        document.body.scrollTop = 0; // per Safari
        document.documentElement.scrollTop = 0; // per Chrome, Firefox, IE, Opera
    }

    const prova = () => {
        // TODO limito la fetch, la faccio solo una volta e ogni volta che raggiungo il fondo aggiungo di 99
        fetch("https://pokeapi.co/api/v2/item?limit=99")
            .then(dati => dati.json())
            .then((boh) => {
                setRis([...boh.results])
            })
    }

    const bohnonloso = () => {
        prova();
        return ris.map((e) => {
            return <ItemElement name={e.name} url={e.url} />
        });
    }

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <div className="row justify-content-center align-items-center g-2">
                    {bohnonloso()}
                </div>
                <button id="backToTopBtn" title="Torna su" onClick={topFunction} ref={backToTopBtn}>
                    <i className="bi bi-arrow-up"></i>
                </button>
            </div>
        </>
    )
}

export default ItemsList