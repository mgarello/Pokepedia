import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);

    const headerElement = useRef();

    useEffect(() => {
        let prevScrollposHeader = window.scrollY;

        const handleScroll = () => {
            let currentScrollPosHeader = window.scrollY;
            if (headerElement.current && headerElement.current.style) {
                if (prevScrollposHeader > currentScrollPosHeader) {
                    headerElement.current.style.top = "0";
                } else {
                    headerElement.current.style.top = "-100%";
                }
            }
            prevScrollposHeader = currentScrollPosHeader;
        };

        // Add the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this effect runs once after initial render

    return (
        <nav className="navbar navbar-expand-xl" ref={headerElement}>
            <button onClick={() => setNavOpen(!navOpen)} className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                <div className={navOpen ? "hamBox hamBoxOpen" : "hamBox"}>
                    <span className={navOpen ? "lineTop spin" : "lineTop"}></span>
                    <span className={navOpen ? "lineBottom spin" : "lineBottom"}></span>
                </div>
            </button>

            <div className={
                navOpen ? "navbar-collapse collapse show" : "navbar-collapse collapse"
            }>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-link">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/Pokemon">Pokémon</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/Abilities">Abilità</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/Moves">Mosse</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/Items">Strumenti</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/Berries">Bacche</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar