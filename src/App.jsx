import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa componentes de React Router
import './App.css';
import SearchAndFilter from "./components/SearchAndFilter";
import CharacterCard from "./components/CharacterCard";
import Footer from './components/Footer'
// Importar el componente CharacterDetails (Asegúrate de crear este componente)
import CharacterDetails from "./components/CharacterDetails";

function App() {
  // Estados para personajes y filtros de búsqueda.
  const [characters, setCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Llamada a la API.
  const getCharacters = async (name = '', status = '') => {
    let url = `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      const data = await response.json();
      if (data.results.length === 0) {
        setCharacters(null); 
      } else {
        setCharacters(data.results);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setCharacters(null); 
    }
  };
  
  // Actualiza personajes cuando los filtros cambian.
  useEffect(() => {
    getCharacters(nameFilter, statusFilter);
  }, [nameFilter, statusFilter]);

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
                ) : characters.length > 0 ? (
                  characters.map(character => (
                    <CharacterCard key={character.id} character={character} />
                  ))
                ) : ( <h2 id="mns-not-found">Realiza una búsqueda para encontrar personajes.</h2>)}
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
