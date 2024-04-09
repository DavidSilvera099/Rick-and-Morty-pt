import React, { useState, useEffect } from 'react';

function Episodes() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const url = 'https://rickandmortyapi.com/api/episode';
      try {
        const response = await fetch(url);
        const data = await response.json();
        setEpisodes(data.results);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };

    fetchEpisodes();
  }, []);

  return (
    <div>
      <h1>Episodios</h1>
      <div className="episodes-container">
        {episodes.map(episode => {
          const match = episode.episode.match(/S(\d+)E(\d+)/);
          const season = match ? match[1] : 'N/A';
          const episodeNumber = match ? match[2] : 'N/A';
          return (
            <div key={episode.id} className="episode-card">
              <h2>{episode.name}</h2>
              <p>Fecha de emisión: {episode.air_date}</p>
              <p>Temporada: {season}, Episodio: {episodeNumber}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Episodes;
