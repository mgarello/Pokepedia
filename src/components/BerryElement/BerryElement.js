import React from "react";
import "./BerryElement.css";

const BerryElement = (props) => {
    // TODO remove - and capitalize
    const name = props.name;
    const URL = props.url;
    let b = URL.split('/'); // salvo gli split dell'url per recuperare il numero del pkmn corrente
    let num = b[b.length-2];    
    // percorsi immagini
    const imagePath = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/";
    const imageExt = ".png";
    const imageURL = imagePath + name + "-berry" + imageExt;

    return (
        // ritorno il pokemon
        <div className="col-12 col-lg-4 col-xl-3 list-element p-4 pkmn-container" key={num}>
            <div>
                <div className="text-center">
                    Name: <b>{name}</b>
                </div>
                <div className="text-center mt-3 mb-3">
                    <img src={imageURL} className="item-img" />
                </div>
            </div>
        </div>
    )
}

export default BerryElement