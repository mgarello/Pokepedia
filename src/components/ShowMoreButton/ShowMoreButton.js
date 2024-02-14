import React from "react";
import "./ShowMoreButton.css";

const ShowMoreButton = (props) => {
    return (
        <div className="button-wrapper">
            <button className="load-button" onClick={props.functionName}>
                {props.text}
            </button>
        </div>
    )
}

export default ShowMoreButton