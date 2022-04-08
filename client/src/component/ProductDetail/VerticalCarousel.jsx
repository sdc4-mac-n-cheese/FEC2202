import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCSS from '../cssModules/ProductDetail.module.css';

const VerticalCarousel = (props) => {
  useEffect(() => {
    props.setCurrIndex(0);
  }, [props.styles]);

  return (
    <>
      <div className={ProductCSS.verticalView}>
        {props.styles.map((photo, i) =>
          <img className={props.currIndex === i ? `${ProductCSS.verticalPhotos} ${ProductCSS.verticalSelected}` : ProductCSS.verticalPhotos} onClick={() => props.setCurrIndex(i)} src={photo.url} alt='product style' key={i} />
        )}
      </div>

      <button className={ProductCSS.verticalButton}>v</button>
    </>
  );
}

VerticalCarousel.propTypes = {
  styles: PropTypes.array,
  currIndex: PropTypes.number,
  setCurrIndex: PropTypes.func
}

export default VerticalCarousel;