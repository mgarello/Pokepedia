import React, { useEffect } from "react";
import useDynamicRefs from "use-dynamic-refs";
import "./AbilityElement.css";

const AbilityElement = (props) => {
    const [getRef, setRef] =  useDynamicRefs();
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
                console.log(name);
                getRef(num).current.innerHTML = name;
            }
        });
    }

    useEffect(()=> {
        request();
    }, []);

    return (
        // ritorno l'abilità
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 list-element p-4 ability-container" key={num}>
            <div className="text-center">
                <b ref={setRef(num)}>{name}</b>
            </div>
        </div>
    )
}

export default AbilityElement