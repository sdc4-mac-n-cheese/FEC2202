import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCSS from '../cssModules/ProductDetail.module.css';
import Carousel from './Carousel.jsx';
import ProductInfo from './ProductInfo.jsx';

const ProductDetail = (props) => {
  //product_id should be passed in through props
  const [currProduct, setCurrProduct] = useState({});
  const [styleResults, setStyleResults] = useState([]);
  const [currStyle, setCurrStyle] = useState({});

  useEffect(() => {
    //65631 is a placeholder
    axios.get(`/product?product_id=${65631}`)
      .then(product => {
        setCurrProduct(product.data);
        return axios.get(`/productStyle?product_id=${65631}`);
      })
      .then(styles => {
        setStyleResults(styles.data.results);
      })
      .catch(err => {
        console.log(err);
      });
  }, [currProduct.id]);

  useEffect(() => {
    //set default style to the first style
    setCurrStyle(styleResults[0]);
  }, [styleResults]);

  const selectStyle = function (id) {
    // console.log('invoked', id);
    styleResults.forEach(style => {
      if (style.style_id === id) {
        setCurrStyle(style);
      }
    });
  }

  return (
    < div className={ProductCSS.main} >
      {/* 0 & 65631 are placeholders */}
      {styleResults.length && currStyle && <Carousel currStyle={currStyle} />}
      {Object.keys(currProduct).length && styleResults.length && currStyle && <ProductInfo product={currProduct} currStyle={currStyle} styles={styleResults} onSelect={selectStyle} />}
    </div >
  );
}

export default ProductDetail;