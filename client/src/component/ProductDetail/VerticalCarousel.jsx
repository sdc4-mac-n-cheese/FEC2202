import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCSS from '../cssModules/ProductDetail.module.css';

const VerticalCarousel = (props) => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    props.setCurrIndex(0);
  }, [props.styles]);

  useEffect(() => {
    if (props.currIndex === 0) {
      setStartIndex(0);
    }

    if (props.currIndex < startIndex) {
      setStartIndex(props.currIndex);
    }
  }, [props.currIndex]);

  const down = () => {
    setStartIndex(startIndex === props.styles.length - 5 ? 0 : startIndex + 1);
  }

  const up = () => {
    // console.log('here', startIndex)
    setStartIndex(startIndex === 0 ? 0 : startIndex - 1);
  }

  if (props.currIndex >= startIndex + 5) {
    setStartIndex(startIndex + 1);
  }

  return (
    <>
      <div className={ProductCSS.verticalView}>
        <button className={startIndex !== 0 ? `${ProductCSS.verticalButton} ${ProductCSS.up}` : `${ProductCSS.verticalButton} ${ProductCSS.up} ${ProductCSS.hidden}`} onClick={up}><i className="fa fa-arrow-up" aria-hidden="true"></i></button>

        {props.styles.map((photo, i) => {
          if (i >= startIndex && i < startIndex + 5) {
            return <img className={props.currIndex === i ? `${ProductCSS.verticalPhotos} ${ProductCSS.verticalSelected}` : ProductCSS.verticalPhotos} onClick={() => {
              props.setCurrIndex(i);
            }} src={photo.url} alt='product style' key={i} />
          }
        })}

        <button className={props.styles.length > 5 ? `${ProductCSS.verticalButton} ${ProductCSS.down}` : `${ProductCSS.verticalButton} ${ProductCSS.down} ${ProductCSS.hidden}`} onClick={down}><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
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