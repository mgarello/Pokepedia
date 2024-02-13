import React, {createElement, useEffect, useRef} from "react";
import useDynamicRefs from "use-dynamic-refs";
import "./ItemElement.css";

const ItemElement = (props) => {
    const [getRef, setRef] =  useDynamicRefs();
    const containerDef = useRef();

    let name = props.name;
    const URL = props.url;
    let b = URL.split('/'); // salvo gli split dell'url per recuperare il numero dell'oggetto corrente
    let num = b[b.length-2];    
    // percorsi immagini
    const imagePath = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/";
    const imageExt = ".png";
    const imageURL = imagePath + name + imageExt;
    const gamePath = "../../images/";

    const request = async () => {
        const response = await fetch(URL);
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
        // ritorno l'oggetto
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 list-element p-4 item-container" style={{minHeight: "calc(35vw - 30vh)"}} key={num}>
            <div>
                <div className="text-center">
                    <b ref={setRef(num)}>{name}</b>
                </div>
                <div className="text-center mt-3 mb-3">
                    <img src={imageURL} className="item-img" />
                </div>
            </div>
            <div ref={containerDef}></div>
        </div>
    )
}

export default ItemElement