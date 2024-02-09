import React, { useEffect, useRef } from "react";
import "./MoveElement.css";

const MoveElement = (props) => {
    const wrapper = useRef();
    const URL = props.image;
    let b = URL.split('/'); // salvo gli split dell'url per recuperare il numero della mossa corrente
    let num = b[b.length-2];
    // percorsi immagini
    const iconUrl = "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/"; // icone dei tipi
    let name = props.name.toLowerCase();
    name = name[0].toUpperCase() + name.slice(1);
    let types = []; // salvo i tipi della mossa

    // faccio la fetch solo una volta
    useEffect(()=> {
        fetch(URL)
        .then(dati => dati.json())
        .then((ris)=> {
            // aggiungo il tipo della mossa
            prendiTipi(ris.type.name)
        });
    }, []);

    const prendiTipi=(tipo)=> {
        // contenitore del tipo della mossa
        let contenitore = document.createElement("div");
        contenitore.classList.add("d-flex",  "justify-content-around", "align-items-center");

        // icona del tipo
        let icona = document.createElement("div");
        icona.classList.add("icon");
        icona.classList.add(tipo);

        // immagine dell'icona
        let img = document.createElement("img");
        img.setAttribute("src", iconUrl + tipo + ".svg");
        img.setAttribute("alt", tipo + " icon");

        // appendo l'immagine nell'icona
        icona.append(img);

        // appendo il contenitore al contenitore dei tipi
        contenitore.appendChild(icona);

        wrapper.current.innerHTML = ""; // pulisco il contenitore
        wrapper.current.appendChild(contenitore); // aggiungo il contenitore con i tipi
    }

    return (
        // ritorno il pokemon
        <div className="col-12 col-lg-4 col-xl-3 list-element p-4 pkmn-container" key={num}>
            <div>
                <div className="text-center">
                    Name: <b>{name}</b>
                </div>
            </div>
            <div ref={wrapper} className="mt-3">
                {/* inserisco i tipi */}
            </div>
        </div>
    )
}

export default MoveElement