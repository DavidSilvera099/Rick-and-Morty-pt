import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Characters</Link></li>
          <li><Link to="/episodios">Espisodies</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
