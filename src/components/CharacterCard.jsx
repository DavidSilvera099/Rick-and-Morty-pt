import React from 'react';
import { Link } from 'react-router-dom'; 

// Componente para mostrar información de un personaje.
const CharacterCard = ({ character }) => {
  return (
    <Link to={`/character/${character.id}`} className="character-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="character-card">
        <div className='card-image-container'>
          <img src={character.image} alt={character.name} />
        </div>
        <div className="content-card">
          <h2>{character.name}</h2>
          <p><span>Status:</span> {character.status}</p>
          <p><span>Especie:</span> {character.species}</p>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
