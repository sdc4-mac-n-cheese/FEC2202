import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCSS from '../cssModules/ProductDetail.module.css';

const VerticalCarousel = (props) => {
  const [startIndex, setStartIndex] = useState(0);
  // const [currVertIndex, setCurrVertIndex] = useState(props.currIndex)

  useEffect(() => {
    props.setCurrIndex(0);
  }, [props.styles]);

  const down = () => {
    setStartIndex(startIndex === props.styles.length - 5 ? 0 : startIndex + 1);
  }

  const up = () => {
    setStartIndex(startIndex === 0 ? 0 : startIndex - 1);
  }

  if (props.currIndex >= startIndex + 5) {
    setStartIndex(startIndex + 1);
  }

  // if (props.currIndex < startIndex) {
  //   setStartIndex(props.currIndex);
  // }

  return (
    <>
      <div className={ProductCSS.verticalView}>
        <button className={startIndex !== 0 ? `${ProductCSS.verticalButton} ${ProductCSS.up}` : `${ProductCSS.verticalButton} ${ProductCSS.up} ${ProductCSS.hidden}`} onClick={up}><i className="fa fa-arrow-up" aria-hidden="true"></i></button>

        {props.styles.map((photo, i) => {
          if (i >= startIndex && i < startIndex + 5) {
            return <img className={props.currIndex === i ? `${ProductCSS.verticalPhotos} ${ProductCSS.verticalSelected}` : ProductCSS.verticalPhotos} onClick={() => {
              props.setCurrIndex(i);
              // setCurrVertIndex(i);
            }} src={photo.url} alt='product style' key={i} />
          }
        })}

        <button className={`${ProductCSS.verticalButton} ${ProductCSS.down}`} onClick={() => {
          // if (startIndex === props.styles.length - 5) {
          //   // setCurrVertIndex(0);
          //   props.setCurrIndex(0);
          // } else {
          //   // setCurrVertIndex(props.currIndex + 1);
          //   props.setCurrIndex(props.currIndex + 1);
          // }
          down();
        }}><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
      </div>
    </>
  );
}

VerticalCarousel.propTypes = {
  styles: PropTypes.array,
  currIndex: PropTypes.number,
  setCurrIndex: PropTypes.func
}

export default VerticalCarousel;