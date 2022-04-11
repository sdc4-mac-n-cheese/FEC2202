import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ProductCSS from '../cssModules/ProductDetail.module.css';
import Carousel from './Carousel.jsx';
import ProductInfo from './ProductInfo.jsx';
import Marketing from './Marketing.jsx';

const ProductDetail = (props) => {
  //product_id should be passed in through props
  // const [currProduct, setCurrProduct] = useState({});
  // const [styleResults, setStyleResults] = useState([]);
  const [currStyle, setCurrStyle] = useState({});

  let currProduct = props.currProductData || {};
  let styleResults = props.currStyleData || [];

  // useEffect(() => {
  //   //65631 is a placeholdr
  //   axios.get(`/product?product_id=${65631}`)
  //     .then(product => {
  //       setCurrProduct(product.data);
  //       return axios.get(`/productStyle?product_id=${65631}`);
  //     })
  //     .then(styles => {
  //       setStyleResults(styles.data.results);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, [currProduct.id]);

  useEffect(() => {
    //set default style to the first style
    if (styleResults.length) {
      setCurrStyle(styleResults[0]);
    }
  }, [styleResults]);

  const selectStyle = function (id) {
    // console.log('invoked', id);
    styleResults.forEach(style => {
      if (style.style_id === id) {
        setCurrStyle(style);
        props.changeStyle(style)
      }
    });
  }

  const addCart = function (sku) {
    console.log('here', sku)
    axios.post('/cart', {
      sku_id: sku
    })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      < div className={ProductCSS.main} >
        {Object.keys(currStyle).length && <Carousel currStyle={currStyle} />}
        {Object.keys(currProduct).length && styleResults.length && currStyle && <ProductInfo product={currProduct} currStyle={currStyle} styles={styleResults} onSelect={selectStyle} addCart={addCart} />}
      </div >
      {Object.keys(currProduct).length && <Marketing product={currProduct} />}
    </>
  );
}

ProductDetail.propTypes = {
  currProductData: PropTypes.object,
  currStyleData: PropTypes.array,
  changeStyle: PropTypes.func
}


export default ProductDetail;