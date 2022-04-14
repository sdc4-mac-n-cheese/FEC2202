import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ProductCSS from '../cssModules/ProductDetail.module.css';
import OutfitCSS from '../cssModules/Outfit.module.css';
import { scroller } from 'react-scroll';
import { starReview } from '../functions.jsx';
import StyleSelector from './StyleSelector.jsx';
import Cart from './Cart.jsx';

const ProductInfo = (props) => {
  const product = props.product;
  const currStyle = props.currStyle;

  const [rating, setRating] = useState(0);

  const toReviews = () => {
    scroller.scrollTo('scroll-targetRR', {
      smooth: true,
      offset: -50
    });
  }

  useEffect(() => {
    axios
      .get('/reviews/meta', { params: { product_id: product.id } })
      .then((res) => {
        let average = 0
        if (!res.data.ratings) {
          setRating(0);
        } else {
          let counter = 0
          let sumscore = 0
          for (const [star, num] of Object.entries(res.data.ratings)) {
            counter += Number(num)
            sumscore += Number(star) * Number(num)
          }
          average = sumscore / counter
          setRating(average);
        }

      })
      .catch(err => { console.log(err) })
  }, [product])

  return (
    <>
      <div className={ProductCSS.info}>
        <div className={ProductCSS.details}>
          <p>
            <div className={ProductCSS.reviews}>{starReview(rating, OutfitCSS)}</div>
            <a onClick={toReviews}>Read all reviews</a>
          </p>
          <p>{product.category.toUpperCase()}</p>
          <h1>{product.name}</h1>
          <p>${product.default_price}</p>
          <p><strong>STYLE  ></strong>{currStyle.name}</p>
        </div>
        <div className={ProductCSS.productOptions}>
          <StyleSelector styles={props.styles} currStyle={currStyle} onSelect={props.onSelect} />
          <Cart currStyle={currStyle} addCart={props.addCart} />
        </div>
      </div>
    </>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object,
  styles: PropTypes.array
}

export default ProductInfo;