import React, { useState, useEffect } from 'react';

// Componente para búsqueda y filtrado de personajes.
const SearchAndFilter = ({ setNameFilter, setStatusFilter }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setNameFilter(inputValue); // Actualiza el filtro de nombre en el componente padre.
    }, 500); // Espera de 500 ms.

    return () => clearTimeout(timer); // Limpieza al  actualizar el componente.
  }, [inputValue, setNameFilter]);

  return (
    <div className="filters">
      <div className="input-wrapper">
        <div className="input-container">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="search-md">
            <path id="Icon" d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
          </svg>
          <input
            type="text"
            id="name-filter"
            placeholder="Search by"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Actualiza el estado.
          />
        </div>
      </div>

      <select
        id="status-filters"
        onChange={(e) => setStatusFilter(e.target.value)} // Actualiza el filtro de estado.
        className="status-width"
      >
        <option value="">Todos</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
  );
};

export default SearchAndFilter;
