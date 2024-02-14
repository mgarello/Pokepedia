import React, { useEffect, useRef, useState } from "react";
import "./PokemonDetail.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

import getColors from "../../helpers/getColors";
import getMultipliers from "../../helpers/getMultipliers";
import StatsChart from "../StatsChart/StatsChart";

const PokemonDetail = () => {
    // loader
    const [isLoading, setIsLoading] = useState(true);

    // URL per chiamata all'API
    const APIURL = "https://pokeapi.co/api/v2/pokemon/";
    const IMAGEURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"; // URL per caricare l'immagine pkmn
    const IMAGEEXT = ".png"; // estensione immagine pkmn
    const ICONURL = "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/"; // URL icona
    const ICONEXT = ".svg"; // estensione icona
    const URLEVCHAIN = "https://pokeapi.co/api/v2/pokemon-species/"; // URL per accedere al Pokémon e alla sua linea evolutiva
    // ottengo il nome presente nell'URL
    let { name } = useParams();
    name = name.trim().toLowerCase();
    // creo i reference per inserire i dati nella pagina
    const pkmnNumber = useRef(); // numero
    const pkmnName = useRef(); // nome
    const pkmnImg = useRef(); // immagine del pkmn
    const pkmnTypes = useRef(); // tipi del pkmn
    const pkmnEvChain = useRef(); // linea evolutiva
    const pkmnHeight = useRef(); // altezza
    const pkmnWeight = useRef(); // peso
    const pkmnAbilities = useRef(); // elenco abilità
    const pkmnItems = useRef(); // elenco strumenti
    const pkmnStats = useRef(); // statistiche
    const pkmnWeak2 = useRef(); // debolezze x2
    const pkmnWeak4 = useRef(); // debolezze x4
    // const pkmnEff1 = useRef(); // effetto x1
    const pkmnRes0 = useRef(); // resistenze x0
    const pkmnRes025 = useRef(); // resistenze x0.25
    const pkmnRes05 = useRef(); // resistenze x0.5

    const [evChain, setEvChain] = useState({});

    const navigate = useNavigate();

    
    // verso del pokemon, viene riprodotto quando l'immagine grande viene cliccata
    // ! non funziona in Safari, problema del browser che non riesce a riprodurre file audio dato un URL
    const playCry = () => {
        // ottengo il verso dal json che ho salvato in sessionStorage
        let json = JSON.parse(sessionStorage.getItem("json"));
        let pkmncry = new Audio(json.cries.latest);
        pkmncry.play();
    }

    useEffect(() => {

        // cerco elemento tradotto in una lista e lo appendo
        const getListInfos = async (url, container) => {
            // scarico maggiori informazioni sull'elemento
            const response = await fetch(url);
            const json = await response.json();

            let a = [];
            // per ogni nome dell'elemento
            json.names.forEach((n) => {
                if (n.language.name === "it") {
                    a.push(n.name);
                }
            });
            // carico gli elementi
            a.forEach((e) => {
                let li = document.createElement("li");
                li.classList.add("info-content");
                li.innerText = e;
                container.current.appendChild(li);
            });
        }

        // carico debolezze e resistenze
        const caricaResDeb = (obj, legenda) => {
            let keys = Object.keys(obj);
            keys.forEach((e) => {
                // tolgo gli effetti normali
                if (obj[e] !== 1) {
                    // creo icona del tipo
                    let div = document.createElement("div");
                    let img = document.createElement("img");
                    div.classList.add("icon-big", e);
                    img.setAttribute("src", ICONURL + e + ICONEXT); // aggiungo il percorso all'icona
                    img.setAttribute("alt", e + "-icon");
                    img.setAttribute("title", e + "-icon");
                    div.appendChild(img);
                    // la appendo nel corrispettivo contenitore
                    legenda[obj[e]].current.appendChild(div);
                }
            });
        }

        // ottengo i dati del Pokémon
        const request = async (name) => {
            setIsLoading(true);
            // scarico
            const response = await fetch(APIURL + name);
            if (response.status === 404) {
                navigate("/Pokemon");
            }
            // converto
            const json = await response.json();
            sessionStorage.setItem("json", JSON.stringify(json));

            // salvo dati necessari
            let num = json.id.toString(); // numero - strattato come stringa
            // aggiungo gli zeri davanti al numero
            while (num.length < 4) {
                num = "0" + num;
            }
            num = "#" + num;
            
            // creo lo sfondo
            getColors(parseInt(num.slice(1)));

            // tipi del Pokémon
            let types = [];
            json.types.forEach((e) => {
                types.push(e.type.name)
            });
            // pulisco contenitore
            pkmnTypes.current.innerHTML = "";
            types.forEach((e) => {
                let div = document.createElement("div");
                let img = document.createElement("img");
                div.classList.add("icon-big", e);
                img.setAttribute("src", ICONURL + e + ICONEXT); // aggiungo il percorso all'icona
                img.setAttribute("alt", e + "-icon");
                img.setAttribute("title", e + "-icon");
                div.appendChild(img);
                pkmnTypes.current.appendChild(div);
            });

            // ricavo debolezze e resistenze
            let { defense } = getMultipliers(types);
            // creo un dizionario con effetto della mossa : ref in cui inserirlo
            let effectContainers = { 0: pkmnRes0, 0.25: pkmnRes025, 0.5: pkmnRes05, /*1: pkmnEff1,*/ 2: pkmnWeak2, 4: pkmnWeak4 }
            // pulisco i contenitori
            Object.keys(effectContainers).forEach((k) => {
                effectContainers[k].current.innerHTML = "";
                let div = document.createElement("div");
                div.classList.add("d-flex", "align-items-center", "info-content");
                div.innerText = "x" + k;
                effectContainers[k].current.appendChild(div);
            });
            // carico nel componente - indico il nome del ref x ogni valore della lista
            caricaResDeb(defense, effectContainers);
            // controllo che non ci siano vuoti, se ci sono li nascondo
            Object.values(effectContainers).forEach((e) => {
                // se l'unico elemento presente è il moltiplicatore
                if (e.current.childElementCount === 1) {
                    e.current.classList.remove("d-flex");
                    e.current.classList.add("d-none");
                }
            });
            
            // imposto il nome
            if (parseInt(name) != NaN) {
                name = json.name;
            }
            name = name[0].toUpperCase() + name.slice(1).toLowerCase(); // capitalize
            name = name.replace('-', ' ');
            pkmnName.current.innerText = name;

            // imposto il numero
            pkmnNumber.current.innerText = num;

            // carico l'immagine del pkmn
            let img = document.createElement("img");
            img.setAttribute("src", IMAGEURL + parseInt(num.slice(1)) + IMAGEEXT);
            img.setAttribute("alt", name);
            img.setAttribute("title", name);
            pkmnImg.current.innerHTML = "";
            pkmnImg.current.appendChild(img);

            // inserisco altezza e peso
            let height = parseFloat(json.height) / 10;
            let weight = parseFloat(json.weight) / 10;
            pkmnHeight.current.innerText = height;
            pkmnWeight.current.innerText = weight;

            // ricavo abilità
            pkmnAbilities.current.innerHTML = ""; // pulisco contenitore
            json.abilities.forEach((e) => {
                // ottengo + informazioni sull'abilità e ciclo per ogni suo nome
                getListInfos(e.ability.url, pkmnAbilities);
            });

            // ricavo strumenti
            pkmnItems.current.innerHTML = ""; // pulisco contenitore
            json.held_items.forEach((e) => {
                // ottengo + informazioni sull'abilità e ciclo per ogni suo nome
                getListInfos(e.item.url, pkmnItems);
            });
            // se l'elenco è vuoto scrivo un messaggio
            if (json.held_items.length === 0) {
                pkmnItems.current.innerHTML = "<li class='info-content'>Non tiene strumenti quando viene incontrato</li>";
            }

            // ottengo statistiche in 'StatsChart.js'

            // cambio il titolo della pagina
            let prevTitle = document.title;
            document.title = name + " - " + prevTitle;

            setIsLoading(false);
        }

        // scarico linea evolutivo
        const loadEvChain = async (url) => {
            let stages = {};
            // resetto lo stato, altrimenti, se passo lo stesso oggetto, non mi ricarica il componente
            setEvChain({});
            // scarico informazioni del pokémon
            const response = await fetch(url);
            const json = await response.json();

            // scarico la catena evolutiva
            const evChainData = await fetch(json.evolution_chain.url);
            const ris = await evChainData.json();
            getEvChain(stages, ris.chain);
            // aggiorno lo stato con la linea evolutiva
            setEvChain(stages);
        }

        // ottengo linea evolutiva
        const getEvChain = (elenco, e) => {
            let b = e.species.url.split('/');
            // salvo le condizioni necessarie per evolversi in quel Pokémon
            let evDet = [];
            e.evolution_details.forEach((item) => {
                if (item !== null) {
                    evDet.push(item);
                }
            });
            // ottengo informazioni relative alle forme alternative
            fetch(e.species.url)
            .then(dati => dati.json())
            .then((json)=> {
                json.varieties.forEach((pkmn)=> {
                    if (!pkmn.is_default) {
                        let l = pkmn.pokemon.url.split('/');
                        elenco[l[l.length - 2.]] = {
                            name: pkmn.pokemon.name
                        };
                    }
                });
                setEvChain(elenco)
            })
            // salvo le informazioni del Pokémon
            elenco[b[b.length - 2]] = {
                name: e.species.name,
                evolution_details: evDet,
                isBaby: e.is_baby
            };
            // se non è l'ultimo elemento nella lista continuo
            if (e.evolves_to.length !== 0) {
                // per ognuna delle sue evoluzioni
                e.evolves_to.forEach((i) => {
                    getEvChain(elenco, i);
                });
            }
        }

        // carico le immagini della catena evolutiva
        let pkmnEvChainUrl = URLEVCHAIN + name;
        setEvChain({});
        loadEvChain(pkmnEvChainUrl);

        // ottengo i dati del Pokémon
        request(name);
    }, [name]);

    return (
        <div className="container-fluid bgColor p-3">
            {isLoading ? <Loader /> : null}
            <div className="row justify-content-center align-items-center flex-row-reverse">
                {/* nome e numero del pkmn */}
                <div className="col-12 col-lg-6 mt-3 remove-top">
                    <div id="pkmn-id">
                        <span className="primaryColor" id="pkmn-name" ref={pkmnName}></span>
                        <span className="thirdyColor" id="pkmn-number" ref={pkmnNumber}></span>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    {/* immagine del pkmn */}
                    <div className="pkmn-detail-img text-center" ref={pkmnImg} onClick={playCry}>
                    </div>
                    {/* icone dei tipi */}
                    <div className="col-12 d-flex justify-content-around align-items-center" ref={pkmnTypes}>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center align-items-center flex-row-reverse">
                <div className="col-12 col-lg-6 alzati" id="second-content">
                    <div className="row justify-content-center align-items-center flex-lg-column-reverse">
                        <div className="col-12 vertical-line">
                            <div className="row justify-content-center align-items-center flex-row-reverse g-3">
                                {/* debolezze */}
                                <div className="col-12">
                                    <hr className="d-lg-none mt-5" />
                                    <p className="mt-5 text-center info-title">Debolezze</p>
                                </div>
                                <div className="col-12 d-flex justify-content-around" ref={pkmnWeak4}>
                                    {/* x4 */}
                                </div>
                                <div className="col-12 d-flex justify-content-around" ref={pkmnWeak2}>
                                    {/* x2 */}
                                </div>
                                {/* effetto normale */}
                                {/* <div className="col-12">
                                    <hr className="d-lg-none mt-5" />
                                    <p className="mt-5 text-center info-title">Effetto normale</p>
                                </div>
                                <div className="col-12 d-flex justify-content-around" ref={pkmnEff1}>
                                    <div className="d-flex align-items-center">
                                        x1
                                    </div>
                                </div> */}
                                {/* resistenze */}
                                <div className="col-12">
                                    <hr className="d-lg-none mt-5" />
                                    <p className="mt-5 text-center info-title">Resistenze</p>
                                </div>
                                <div className="col-12 d-flex justify-content-around" ref={pkmnRes0}>
                                    {/* x0 */}
                                </div>
                                <div className="col-12 d-flex justify-content-around" ref={pkmnRes025}>
                                    {/* x0.25 */}
                                </div>
                                <div className="col-12 d-flex justify-content-around" ref={pkmnRes05}>
                                    {/* x0.5 */}
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row justify-content-center align-items-center">
                                {/* linea evolutiva */}
                                <div className="col-12">
                                    <hr className="d-lg-none mt-5" />
                                    <p className="mt-5 text-center info-title">Linea evolutiva</p>
                                    <div className="d-flex justify-content-around" ref={pkmnEvChain}>
                                        {/* creo la catena evolutiva */}
                                        {Object.keys(evChain).sort().map((num)=> {
                                            let currentName = evChain[num].name.trim();
                                            currentName = currentName[0].toUpperCase() + currentName.slice(1);
                                            let path = "/Pokemon/" + currentName;
                                            return (
                                                // ? le forme alternative vengono mostrate solo se clicco sul Pokémon corrente nella linea delle evoluzioni - possibile soluzione: passo lo stesso oggetto e il componente non si riaggiorna fino a quando non lo faccio manualmente (come era successo x link da stadi evolutivi che non venivano mostrati)
                                                <div className="evolution-chain-img">
                                                    <Link to={path} key={currentName}>
                                                        <img src={IMAGEURL + num + IMAGEEXT} alt={currentName} title={currentName} />
                                                    </Link>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6 text-center mt-5">
                    <div className="row justify-content-center align-items-center">
                        {/* infos */}
                        <div className="col-12">
                            <div className="mt-5 text-center">
                                <hr className="d-lg-none" />
                                <div className="row justify-content-center align-items-center mt-5">
                                    <div className="col-6 info-content">
                                        <span className="info-title">Altezza:</span> <span ref={pkmnHeight} >0,7</span>m
                                    </div>
                                    <div className="col-6 info-content">
                                        <span className="info-title">Peso:</span> <span ref={pkmnWeight} >15</span>kg
                                    </div>
                                </div>
                            </div>
                            <hr className="d-lg-none mt-5" />
                            <div className="d-flex justify-content-around">
                                <div className="mt-5 col-4">
                                    <span className="info-title">Abilità:</span>
                                    <ul ref={pkmnAbilities} className="text-start">
                                    </ul>
                                </div>
                                <div className="mt-5 col-4">
                                    <span className="info-title">Strumenti:</span>
                                    <ul ref={pkmnItems} className="text-start">
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-5">
                            <hr className="d-lg-none mt-5" />
                            <span className="mt-4 info-title">Statistiche base</span>
                            <div className="mt-4" ref={pkmnStats} id="chart-container">
                                {(!isLoading) ? <StatsChart pkmnname={name} primaryColor="var(--primary-pkmn-color)" /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonDetail