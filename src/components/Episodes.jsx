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
    <div className='page-episodes-container'>
      <h1 id='ep-title'>EPISODES</h1>
      <div className="episodes-container">
        {episodes.map(episode => {
          const match = episode.episode.match(/S(\d+)E(\d+)/);
          const season = match ? match[1] : 'N/A';
          const episodeNumber = match ? match[2] : 'N/A';
          return (
            <div key={episode.id} className="episode-card">
              <h2 className='ep-card-title'>{episode.name}</h2>
              <p> <span className='temp-card'>Season {season}</span> <span className='ep-card'>Episode {episodeNumber}</span></p>
              <p> <span className='ep-card'>Launch:</span> <br></br>{episode.air_date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Episodes;
