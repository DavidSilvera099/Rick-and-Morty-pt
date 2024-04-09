import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchAndFilter from "./components/SearchAndFilter";
import CharacterCard from "./components/CharacterCard";
import Footer from './components/Footer';
import CharacterDetails from "./components/CharacterDetails";

function App() {
  const [characters, setCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 12; // 3 filas de 4 columnas = 12 elementos por página

  const getCharacters = async (name = '', status = '') => {
    let url = `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      const data = await response.json();
      setCharacters(data.results || null);
    } catch (error) {
      console.error('Fetch error:', error);
      setCharacters(null); 
    }
  };

  useEffect(() => {
    getCharacters(nameFilter, statusFilter);
  }, [nameFilter, statusFilter]);

  const personajesActuales = characters ? characters.slice((paginaActual - 1) * elementosPorPagina, paginaActual * elementosPorPagina) : [];
  const totalDePaginas = characters ? Math.ceil(characters.length / elementosPorPagina) : 0;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <div className='image-banner'><h1>The Rick and Morty API</h1></div>
            <SearchAndFilter setNameFilter={setNameFilter} setStatusFilter={setStatusFilter} />
            <div className="container">
              <div id="characters">
                {characters === null ? (
                  <h2 id="mns-not-found">No se encontraron personajes con ese nombre.</h2>
                ) : personajesActuales.length > 0 ? (
                  personajesActuales.map(character => (
                    <CharacterCard key={character.id} character={character} />
                  ))
                ) : ( <h2 id="mns-not-found">Realiza una búsqueda para encontrar personajes.</h2>)}
              </div>  
              <div className="pagination">
                <button onClick={() => setPaginaActual(p => Math.max(p - 1, 1))} disabled={paginaActual === 1}>
                  &#x2190; Previous
                </button>
                <button onClick={() => setPaginaActual(p => Math.min(p + 1, totalDePaginas))} disabled={paginaActual === totalDePaginas}>
                  Next &#x2192;
                </button>
              </div>
            </div>
          </>
        } />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
