import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchAndFilter from "./components/SearchAndFilter";
import CharacterCard from "./components/CharacterCard";
import Footer from './components/Footer';
import CharacterDetails from "./components/CharacterDetails";
import Header from './components/Header'; // Importa el componente Header
import Episodes from './components/Episodes'; // Importa el componente Episodes

function App() {
  const [characters, setCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 12; // 3 filas de 4 columnas = 12 elementos por página

  // Llamada a la API para obtener personajes.
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

  // Efecto para actualizar la lista de personajes cuando cambian los filtros.
  useEffect(() => {
    getCharacters(nameFilter, statusFilter);
  }, [nameFilter, statusFilter]);

  // Cálculo de personajes a mostrar en la página actual
  const personajesActuales = characters ? characters.slice((paginaActual - 1) * elementosPorPagina, paginaActual * elementosPorPagina) : [];
  const totalDePaginas = characters ? Math.ceil(characters.length / elementosPorPagina) : 0;

  return (
    <BrowserRouter>
      <Header />
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
        <Route path="/episodios" element={<Episodes />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
