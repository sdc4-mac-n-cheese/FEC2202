import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCSS from '../cssModules/ProductDetail.module.css';

const StyleSelector = (props) => {
  return (
    <div className={ProductCSS.selectorContainer}>
      {props.styles.map((style, i) =>
        <button key={i}></button>
      )}
    </div>
  );
}

StyleSelector.propTypes = {
  styles: PropTypes
}

export default StyleSelector;