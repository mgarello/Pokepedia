import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import Search from './pages/Search';
// navbar pages
import PokemonList from "./pages/PokemonList.js";
import AbilitiesList from "./pages/AbilitiesList.js";
import MovesList from "./pages/MovesList.js";
import ItemsList from "./pages/ItemsList.js";
import BerriesList from "./pages/BerriesList.js";
// detail pages
import PokemonDetail from './components/PokemonDetail/PokemonDetail.js';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      {/* navbar */}
      <Route path="/" element={<Search />} />
      <Route path="/Pokemon" element={<PokemonList />} />
      <Route path="/Abilities" element={<AbilitiesList />} />
      <Route path="/Moves" element={<MovesList />} />
      <Route path="/Items" element={<ItemsList />} />
      <Route path="/Berries" element={<BerriesList />} />
      {/* dettagli */}
      <Route path="/Pokemon/:name" element={<PokemonDetail />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
