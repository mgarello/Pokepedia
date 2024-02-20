import React from "react";
import ColorThief from "colorthief";

const getColors = (num) => {
    const rgb = (r, g, b) => {
        return `rgb(${r}, ${g}, ${b})`
    }

    let image = new Image;
    image.onload = function () {
        let colorThief = new ColorThief();
        let plt = colorThief.getPalette(image, 4);

        let bgChannels, primaryChannels, secondaryChannels, thirdyChannels;
        [bgChannels, primaryChannels, secondaryChannels, thirdyChannels] = plt;
        let bgColor = rgb(bgChannels[0] + 30, bgChannels[1] + 30, bgChannels[2] + 30);
        let bgColorEnd = rgb(bgChannels[0] - 30, bgChannels[1] - 30, bgChannels[2] - 30);
        let primaryColor = rgb(primaryChannels[0], primaryChannels[1], primaryChannels[2]);
        let secondaryColor = rgb(secondaryChannels[0], secondaryChannels[1], secondaryChannels[2]);
        let thirdyColor = rgb(thirdyChannels[0], thirdyChannels[1], thirdyChannels[2]);
        let invertedColor = rgb(255 - thirdyChannels[0], 255 - thirdyChannels[1], 255 - thirdyChannels[2]);
        let css = document.createElement('style');
        css.type = 'text/css';
        css.innerHTML = `   
                            body {
                                --primary-pkmn-color: ${primaryColor};
                                --secondary-pkmn-color: ${secondaryColor};
                                --thirdy-pkmn-color: ${thirdyColor};
                            }

                            .bgColor {
                                background: linear-gradient( -45deg, ${bgColor}, ${bgColorEnd} );
                                     }
                            .primaryColor { color: ${primaryColor}; }
                            .secondaryColor { color: ${secondaryColor}; } 
                            .thirdyColor { color: ${thirdyColor}; }
                            .borderColor { 
                                text-shadow: -1px 0 ${bgColor}, 0 1px ${bgColor}, 1px 0 ${bgColor}, 0 -1px ${bgColor};
                            }
                            .tooltipColor {
                                background: ${bgColor};
                                border-bottom: 56px solid ${secondaryColor};
                            }
                            .onoffswitch-inner:before {
                                background-color: ${secondaryColor};
                            }
                            .onoffswitch-label, .onoffswitch-switch {
                                border: 2px solid ${secondaryColor};
                                background-color: ${secondaryColor}; 
                            }
                            .onoffswitch-inner:before {
                                color: ${bgColor};
                            }
                            .onoffswitch-inner:after {
                                background-color: ${bgColor}; 
                            }
                            .onoffswitch-switch {
                                background: ${bgColor};
                            }
                            .onoffswitch-inner:after {
                                color: ${thirdyColor};
                            }
                            .invertedColor {
                                background: ${invertedColor}
                            }
                            `;
        document.body.appendChild(css);
        document.head.querySelectorAll('meta[name=theme-color]')[0].content = bgColor;
    }
    // percorso dell'immagine
    image.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + num + ".png";
    image.crossOrigin = 'Anonymous';
}

export default getColors