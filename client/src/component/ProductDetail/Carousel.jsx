import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCSS from '../cssModules/ProductDetail.module.css';

const Carousel = (props) => {
  const styles = props.photos;

  const [currIndex, setCurrIndex] = useState(0);
  const [length, setLength] = useState(styles.length);

  useEffect(() => {
    setLength(styles.length)
  }, [props.productId]);

  const next = () => {
    setCurrIndex(currIndex === length - 1 ? 0 : currIndex + 1);
  }

  const prev = () => {
    setCurrIndex(currIndex === 0 ? 0 : currIndex - 1);
  }

  return (
    <div className={ProductCSS.carousel}>
      <button className={ProductCSS.leftArrow} onClick={prev}>&lt;</button>
      <button className={ProductCSS.rightArrow} onClick={next}>&gt;</button>
      <div className={ProductCSS.carouselContent}>
        {styles.map((photo, i) =>
          <div key={i} className={i === currIndex ? `${ProductCSS.style} ${ProductCSS.active}` : ProductCSS.style}>
            {i === currIndex && (
              <img src={photo.url} alt='style' className={ProductCSS.spotlight} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  photos: PropTypes.array,
  productId: PropTypes.number
}

export default Carousel;