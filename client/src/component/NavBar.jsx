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
      <span className={NavCSS.PD} onClick={() => toTarget('scroll-targetPD', -500)}>
        Product Detail
      </span>
      <span className={NavCSS.RP} onClick={() => toTarget('scroll-targetRP', -140)}>
        Related Products
      </span>
      <span className={NavCSS.QA} onClick={() => toTarget('scroll-targetQA', -65)}>
        Questions & Answers
      </span>
      <span className={NavCSS.RR} onClick={() => toTarget('scroll-targetRR', -50)}>
        Ratings & Reviews
      </span>
      <span className={NavCSS.search}>
        <input type='text' />
        <i className="fa fa-search" aria-hidden="true"></i>
      </span>
    </div>
  );
}

export default NavBar;