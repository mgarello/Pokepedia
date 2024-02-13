import React, {useEffect, useRef} from "react";
import useDynamicRefs from "use-dynamic-refs";
import "./BerryElement.css";

const BerryElement = (props) => {
    const [getRef, setRef] =  useDynamicRefs();
    const containerDef = useRef();

    const URL = props.url;
    let b = URL.split('/'); // salvo gli split dell'url per recuperare il numero del pkmn corrente
    let num = b[b.length-2];
    let name = props.name; // ricavo il nome passato dal padre: mi serve per caricare la foto
    // percorsi immagini
    const imagePath = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/";
    const imageExt = ".png";
    const imageURL = imagePath + name + "-berry" + imageExt;

    const request = async () => {
        // ricavo l'URL per le info dettagliate
        const f = await fetch(URL);
        const r = await f.json();


        // ricavo le info dettagliate della bacca
        const response = await fetch(r.item.url);
        const json = await response.json();

        json.names.forEach((e) => {
            if (e.language.name === "it") {
                name = e.name;
                getRef(num).current.innerHTML = name;
            }
        });

        json.flavor_text_entries.forEach((e)=> {
            if (e.language.name === "it" && containerDef.current.childElementCount === 0) {
                let text = document.createElement("p");
                text.innerHTML = e.text;
                containerDef.current.appendChild(text);
            }
        });
    }

    useEffect(()=> {
        request();
    }, []);

    return (
        // ritorno il pokemon
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 list-element p-4 pkmn-container" style={{minHeight: "calc(35vw - 30vh)"}} key={num}>
            <div>
                <div className="text-center">
                    <b ref={setRef(num)}>{name}</b>
                </div>
                <div className="text-center mt-3 mb-3">
                    <img src={imageURL} className="berry-img" />
                </div>
            </div>
            <div ref={containerDef}></div>
        </div>
    )
}

export default BerryElement