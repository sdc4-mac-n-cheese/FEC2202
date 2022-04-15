import React from 'react';
import NavCSS from './cssModules/NavBar.module.css';
import { scroller } from 'react-scroll';

const toReviews = () => {

  scroller.scrollTo('scroll-targetRR', {
    smooth: true,
    offset: -50
  });
}

const toDetail = () => {

  scroller.scrollTo('scroll-targetPD', {
    smooth: true,
    offset: -500
  });
}

const toQuestions = () => {

  scroller.scrollTo('scroll-targetQA', {
    smooth: true,
    offset: -65
  });
}

const toRelated = () => {

  scroller.scrollTo('scroll-targetRP', {
    smooth: true,
    offset: -140
  });
}

const NavBar = () => {

  return (
    <div className={NavCSS.navbar}>
      <h1 className={NavCSS.logo}>ATELIER</h1>
      <span className={NavCSS.PD} onClick={toDetail}>
        Product Detail
      </span>
      <span className={NavCSS.RP} onClick={toRelated}>
        Related Products
      </span>
      <span className={NavCSS.QA} onClick={toQuestions}>
        Questions & Answers
      </span>
      <span className={NavCSS.RR} onClick={toReviews}>
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