import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CharacterDetails() {
  const { id } = useParams(); //ID del personaje de la URL
  const [character, setCharacter] = useState(null);

  // Llamada a la API para obtener los detalles del personaje
  useEffect(() => {
    const getCharacterDetails = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    getCharacterDetails();
  }, [id]); // El efecto se ejecuta cuando el ID cambia

  // Renderizar detalles del personaje
  if (!character) {
    return <div>Cargando detalles del personaje...</div>;
  }

  return (
    <div className="character-details-container">
      <div className="character-info">
        <div className='character-img-container'>
            <img src={character.image} alt={`Imagen de ${character.name}`} className="character-image" />
        </div>
        <div className='character-text'>
            <h1>{character.name}</h1>
            <p>Status: <span>{character.status}</span></p>
            <p>Species: <span>{character.species}</span></p>
            <p>Type: <span>{character.type || 'N/A'}</span></p>
            <p>Gender: <span>{character.gender}</span></p>
            <p>Origin: <span>{character.origin.name}</span></p>
            <p>Location: <span>{character.location.name}</span></p>
            <p className="episode-count">Episodes: <span>{character.episode.length}</span></p>
            <p className="creation-date">Created: <span>{new Date(character.created).toLocaleDateString()}</span></p>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
