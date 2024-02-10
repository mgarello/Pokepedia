import React, {useEffect} from "react";
import useDynamicRefs from "use-dynamic-refs";
import "./ItemElement.css";

const ItemElement = (props) => {
    const [getRef, setRef] =  useDynamicRefs();
    let name = props.name;
    const URL = props.url;
    let b = URL.split('/'); // salvo gli split dell'url per recuperare il numero dell'oggetto corrente
    let num = b[b.length-2];    
    // percorsi immagini
    const imagePath = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/";
    const imageExt = ".png";
    const imageURL = imagePath + name + imageExt;

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
        // ritorno il pokemon
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 list-element p-4 item-container" key={num}>
            <div>
                <div className="text-center">
                    <b ref={setRef(num)}>{name}</b>
                </div>
                <div className="text-center mt-3 mb-3">
                    <img src={imageURL} className="item-img" />
                </div>
            </div>
        </div>
    )
}

export default ItemElement