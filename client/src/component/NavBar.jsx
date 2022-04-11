import React from 'react';
import NavCSS from './cssModules/NavBar.module.css';

const NavBar = () => {
  return (
    <div className={NavCSS.navbar}>
      <h1 className={NavCSS.logo}>ATELIER</h1>
      <span className={NavCSS.search}>
        <input type='text' />
        <i className="fa fa-search" aria-hidden="true"></i>
      </span>
    </div>
  );
}

export default NavBar;