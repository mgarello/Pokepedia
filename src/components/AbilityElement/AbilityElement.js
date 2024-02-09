import React from "react";
import "./AbilityElement.css";

const AbilityElement = (props) => {
    // TODO remove - and capitalize
    const name = props.name;
    const URL = props.url;
    let b = URL.split('/'); // salvo gli split dell'url per recuperare il numero del pkmn corrente
    let num = b[b.length-2];

    return (
        // ritorno il pokemon
        <div className="col-12 col-lg-4 col-xl-3 list-element p-4 pkmn-container" key={num}>
            <div>
                <div className="text-center">
                    <b>{name}</b>
                </div>
            </div>
        </div>
    )
}

export default AbilityElement