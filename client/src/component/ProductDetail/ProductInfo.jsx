import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCSS from '../cssModules/ProductDetail.module.css';
import { scroller } from 'react-scroll';
import StyleSelector from './StyleSelector.jsx';
import Cart from './Cart.jsx';

const ProductInfo = (props) => {
  const product = props.product;
  const currStyle = props.currStyle;
<<<<<<< HEAD
=======

  const toReviews = () => {
    scroller.scrollTo('scroll-target', {
      smooth: true
    });
  }
>>>>>>> main

  return (
    <>
      <div className={ProductCSS.info}>
        <div className={ProductCSS.details}>
          <p>[insert stars here] <a onClick={toReviews}>Read all reviews</a></p>
          <p>{product.category.toUpperCase()}</p>
          <h1>{product.name}</h1>
          <p>${product.default_price}</p>
          <p><strong>STYLE  ></strong>{currStyle.name}</p>
        </div>
        <StyleSelector styles={props.styles} currStyle={currStyle} onSelect={props.onSelect} />
        <Cart currStyle={currStyle} addCart={props.addCart} />
      </div>
    </>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object,
  styles: PropTypes.array
}

export default ProductInfo;