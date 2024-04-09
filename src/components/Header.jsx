import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul className='links-header-container'>
          <li><Link to="/">Characters</Link></li>
          <li><Link to="/episodios">Espisodes</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
