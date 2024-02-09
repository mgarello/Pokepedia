import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <div className="nav">
            <div className="nav-container">
                <div className="navbar">
                    {/* <div className="logo">Harrnish</div> */}
                    <div className="menu-toggle" onClick={()=> setNavOpen(!navOpen)}>
                        <div className={navOpen ? "hamBox hamBoxOpen" : "hamBox"}>
                            <span className={navOpen ? "lineTop spin" : "lineTop"}></span>
                            <span className={navOpen ? "lineBottom spin" : "lineBottom"}></span>
                        </div>
                    </div>
                </div>
                <div className="nav-overlay" style={{
                        top: navOpen ? "0" : "-100%",
                        transitionDelay: navOpen ? "0s" : "0s"
                    }}>
                    <ul className="nav-links">
                        <li className="nav-item">
                            <Link to="/" onClick={()=> setNavOpen(!navOpen)} style={{
                                top: navOpen ? "0" : "120px",
                                transitionDelay: navOpen ? "0.4s" : "0s"
                            }}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" onClick={()=> setNavOpen(!navOpen)} style={{
                                top: navOpen ? "0" : "120px",
                                transitionDelay: navOpen ? "0.5s" : "0s"
                            }}>Pokémon</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" onClick={()=> setNavOpen(!navOpen)} style={{
                                top: navOpen ? "0" : "120px",
                                transitionDelay: navOpen ? "0.6s" : "0s"
                            }}>Abilities</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" onClick={()=> setNavOpen(!navOpen)} style={{
                                top: navOpen ? "0" : "120px",
                                transitionDelay: navOpen ? "0.7s" : "0s"
                            }}>Moves</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" onClick={()=> setNavOpen(!navOpen)} style={{
                                top: navOpen ? "0" : "120px",
                                transitionDelay: navOpen ? "0.8s" : "0s"
                            }}>Items</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" onClick={()=> setNavOpen(!navOpen)} style={{
                                top: navOpen ? "0" : "120px",
                                transitionDelay: navOpen ? "0.9s" : "0s"
                            }}>Berries</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar