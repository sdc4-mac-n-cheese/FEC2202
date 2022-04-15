import React from 'react';
import NavCSS from './cssModules/NavBar.module.css';
import { scroller } from 'react-scroll';

const toTarget = (target, offset) => {
  scroller.scrollTo(target, {
    smooth: true,
    offset: offset
  });
}

const NavBar = () => {

  return (
    <div className={NavCSS.navbar}>
      <h1 className={NavCSS.logo}>ATELIER</h1>

      <button className={NavCSS.hamburger} onClick={() => {
        document.getElementById('nav-elements').classList.toggle(NavCSS.show);
      }}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </button>

      <ul className={NavCSS.navElements} id='nav-elements'>
        <li><a onClick={() => toTarget('scroll-targetPD', -500)}>Product Detail</a></li>
        <li><a onClick={() => toTarget('scroll-targetRP', -140)}>Related Products</a></li>
        <li><a onClick={() => toTarget('scroll-targetQA', -65)}>Questions & Answers</a></li>
        <li><a onClick={() => toTarget('scroll-targetRR', -50)}>Ratings & Reviews</a></li>
      </ul>

      <span className={NavCSS.search}>
        <input type='text' />
        <i className="fa fa-search" aria-hidden="true"></i>
      </span>
    </div>
  );
}

export default NavBar;