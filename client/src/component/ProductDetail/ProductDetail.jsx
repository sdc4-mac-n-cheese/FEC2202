import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCSS from '../cssModules/ProductDetail.module.css';
import Carousel from './Carousel.jsx';
import ProductInfo from './ProductInfo.jsx';

const ProductDetail = (props) => {
  //product_id should be passed in through props
  const [currProduct, setCurrProduct] = useState({})
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //65631 is a placeholder
    axios.get(`/product?product_id=${65631}`)
      .then(product => {
        console.log(product.data)
        setCurrProduct(product.data);
        return axios.get(`/productStyle?product_id=${65631}`);
      })
      .then(styles => {
        setProducts(styles.data.results);
        console.log('images here', products)
      })
      .catch(err => {
        console.log(err);
      });
  }, [currProduct.id]);

  if (!products.length) {
    return null;
  }

  return (
    < div className={ProductCSS.main} >
      {/* 0 & 65631 are placeholders */}
      <Carousel photos={products[0].photos} productId={65631} />
      <ProductInfo product={currProduct} styles={products} />
    </div >
  );
}

export default ProductDetail;