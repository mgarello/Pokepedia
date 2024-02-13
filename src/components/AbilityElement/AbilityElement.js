import React, { useEffect, useRef } from "react";
import useDynamicRefs from "use-dynamic-refs";
import "./AbilityElement.css";

const AbilityElement = (props) => {
    const [getRef, setRef] =  useDynamicRefs();
    const containerDef = useRef();

    const URL = props.url;
    let b = URL.split('/'); // salvo gli split dell'url per recuperare il numero dell'abilità corrente
    let num = b[b.length-2];
    let name;

    const request = async () => {
        const response = await fetch(URL);
        const json = await response.json();

        json.names.forEach((e) => {
            // console.log(e.language.name);
            if (e.language.name === "it") {
                name = e.name;
                getRef(num).current.innerHTML = name;
            }
        });

        json.flavor_text_entries.forEach((e)=> {
            if (e.language.name === "it" && containerDef.current.childElementCount === 0) {
                let text = document.createElement("p");
                text.innerHTML = e.flavor_text;
                containerDef.current.appendChild(text);
            }
        });
    }

    useEffect(()=> {
        request();
    }, []);

    return (
        // ritorno l'abilità
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 list-element p-4 ability-container" style={{minHeight: "calc(15vw - 15vh)"}} key={num}>
            <div className="text-center">
                <b ref={setRef(num)}>{name}</b>
            </div>
            <div ref={containerDef}></div>
        </div>
    )
}

export default AbilityElement