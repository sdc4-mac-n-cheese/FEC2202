import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCSS from '../cssModules/ProductDetail.module.css';
import StyleSelector from './StyleSelector.jsx'

const ProductInfo = (props) => {
  const [currStyle, setCurrStyle] = useState(props.styles[0]);

  return (
    <div className={ProductCSS.info}>
      <p>[insert stars here] <a>Read all reviews</a></p>
      <p>{props.product.category.toUpperCase()}</p>
      <h1>{props.product.name}</h1>
      <p>${props.product.default_price}</p>
      <p><strong>STYLE ></strong> {currStyle.name}</p>
      <StyleSelector styles={props.styles} />
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object,
  styles: PropTypes.array
}

export default ProductInfo;