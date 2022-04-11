import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductCSS from '../cssModules/ProductDetail.module.css';

const Cart = (props) => {
  const [count, setCount] = useState(1);
  const [countLimit, setCountLimit] = useState(15)
  const [isStarred, setIsStarred] = useState(false);
  const [sku, setSku] = useState();

  const quantities = [];
  for (let key in props.currStyle.skus) {
    quantities.push([key, props.currStyle.skus[key]]);
  }

  const selectSize = function (event) {
    //toggles style for selected button
    let sizeOptions = [...document.getElementById('sizes').children];
    sizeOptions.forEach(size => {
      if (size.classList.contains(ProductCSS.btnSelected)) {
        size.classList.remove(ProductCSS.btnSelected);
      }
    });

    event.target.classList.toggle(ProductCSS.btnSelected);
    setCount(1);

    //set limit on quantity based on size
    let sizeQuantity = event.target.getAttribute('quantity');
    console.log('SIZE QUANTITY', sizeQuantity)
    setCountLimit(sizeQuantity > 15 ? 15 : sizeQuantity);
  }

  const incrementCount = function () {
    if (count >= countLimit) {
      return;
    }
    setCount(count + 1);
  }

  const decrementCount = function () {
    if (count <= 1) {
      return;
    }
    setCount(count - 1);
  }

  return (
    <div className={ProductCSS.cartOptions}>
      <h4>Sizes:</h4>
      <div className={ProductCSS.sizes} id='sizes' >
        {quantities.map((sku, i) => {
          if (!sku[0] || !sku[1].size) {
            return;
          }

          return <button onClick={(e) => {
            setSku(sku[0])
            selectSize(e)
          }} quantity={sku[1].quantity} key={i}>{sku[1].size}</button>
        })}
      </div>

      <h4>Quantity:</h4>
      <div className={ProductCSS.quantity}>
        <button onClick={decrementCount}>-</button>
        <p>{count}</p>
        <button onClick={incrementCount}>+</button>
      </div>

      <div>
        <button className={ProductCSS.add} onClick={() => {
          if (!sku) {
            alert('Please select an item to add to the cart');
            return;
          }
          props.addCart(sku);
          alert('Added to Cart!');
        }}>ADD TO BAG <span>+</span></button>
        <button className={ProductCSS.favorite} onClick={() => setIsStarred(!isStarred)}>
          {isStarred ? <i className="fa fa-star" aria-hidden="true"></i> : <i className="fa fa-star-o" aria-hidden="true"></i>}
        </button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  currStyle: PropTypes.object,
  addCart: PropTypes.func
}

export default Cart;