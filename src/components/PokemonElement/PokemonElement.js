import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./PokemonElement.css";

const PokemonElement = (props) => {
    const wrapper = useRef();
    const URL = props.image;
    let b = URL.split('/'); // salvo gli split dell'url per recuperare il numero del pkmn corrente
    let num = b[b.length - 2];
    // percorsi immagini
    const imagePath = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + num + ".png" // sprites dei pkmn
    const iconUrl = "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/"; // icone dei tipi
    let name = props.name.toLowerCase();
    name = name[0].toUpperCase() + name.slice(1);
    let types = []; // salvo i tipi del pkmn
    // aggiungo gli zeri davanti al numero
    while (num.length < 4) {
        num = "0" + num;
    }

    // faccio la fetch solo una volta
    useEffect(() => {
        fetch(URL)
            .then(dati => dati.json())
            .then((ris) => {
                // ! non uso il codice qua sotto (che funziona) perché sforo le dimensioni della localStorage
                /*
                // estrapolo il contenuto della localStorage
                let ls = localStorage.getItem("PokemonList");
                // controllo che non sia null
                if (ls != null) {
                    // converto la stringa in ls in json
                    ls = JSON.parse(ls);
                    console.log(ls)
                    // accodo il JSON appena scaricato nella localStorage
                    ls.push(ris);
                    // converto l'array in stringa
                    ls = JSON.stringify(ls);
                    // carico la stringa ottenuta nella localStorage
                    localStorage.setItem("PokemonList", ls)
                } else {
                    // inserisco quanto ho scaricato dentro un array
                    let array = new Array(ris);
                    // carico la stringa ottenuta in localStorage
                    localStorage.setItem("PokemonList", JSON.stringify(array))
                }
                */

                // console.log("faccio fetch")
                ris.types.forEach((e) => {
                    types.push(e.type.name)
                });
                // aggiungo i tipi del pkmn
                prendiTipi(types)
            });
    }, []);

    const prendiTipi = (elenco) => {
        // contenitore dei tipi del pkmn
        let contenitore = document.createElement("div");
        contenitore.classList.add("d-flex", "justify-content-around", "align-items-center");
        elenco.forEach((e) => {
            // icona del tipo
            let icona = document.createElement("div");
            icona.classList.add("icon");
            icona.classList.add(e);

            // immagine dell'icona
            let img = document.createElement("img");
            img.setAttribute("src", iconUrl + e + ".svg");
            img.setAttribute("alt", e + " icon");

            // appendo l'immagine nell'icona
            icona.append(img);

            // appendo il contenitore al contenitore dei tipi
            contenitore.appendChild(icona);
        });
        wrapper.current.innerHTML = ""; // pulisco il contenitore
        wrapper.current.appendChild(contenitore); // aggiungo il contenitore con i tipi
    }

    return (
        // ritorno il pokemon
        <div className="col-12 col-lg-4 col-xl-3 list-element p-4 pkmn-container" key={num}>
            <Link to={"/Pokemon/" + name}>
                <div>
                    <div className="text-center">
                        <b>{name}</b>
                        <br />
                        <i>#{num}</i>
                    </div>
                    <div className="text-center mt-3 mb-3">
                        <img src={imagePath} alt={name} className="pkmn-img" />
                    </div>
                </div>
                <div ref={wrapper}>
                    {/* inserisco i tipi */}
                </div>
            </Link>
        </div>
    )
}

export default PokemonElement