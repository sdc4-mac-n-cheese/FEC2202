import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCSS from '../cssModules/ProductDetail.module.css';

const StyleSelector = (props) => {
  //hard coded
  const currStyle = props.currStyle;

  return (
    <div className={ProductCSS.selectorContainer}>
      {props.styles.map((style, i) =>
        <div className={ProductCSS.styleSelector} key={i}>
          {currStyle.style_id === style.style_id && <span className={ProductCSS.check}>&#10003;</span>}
          {console.log('YOOOOO', style)}
          <img src={style.photos[0].thumbnail_url} alt='alt styles' onClick={() => props.onSelect(style.style_id)} />
        </div>
      )}
    </div>
  );
}

StyleSelector.propTypes = {
  currStyle: PropTypes.object,
  styles: PropTypes.array,
  onSelect: PropTypes.func
}

export default StyleSelector;