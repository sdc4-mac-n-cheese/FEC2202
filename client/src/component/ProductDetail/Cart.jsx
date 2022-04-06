import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCSS from '../cssModules/ProductDetail.module.css';

const Cart = (props) => {

  const dropdownOnClick = function (id) {
    if (id === 'size') {
      document.getElementById(id).classList.toggle(ProductCSS.showSizeDropdown);
    } else {
      document.getElementById(id).classList.toggle(ProductCSS.showQuantityDropdown);
    }
  }

  return (
    <div className={ProductCSS.cartOptions}>
      <div>

        <div className={ProductCSS.dropdown}>
          <button className={ProductCSS.size} onClick={() => dropdownOnClick('size')}>SELECT SIZE <span>v</span></button>
          <div className={ProductCSS.dropdownMenu} id='size'>
            {/* Sizes not available should not appear within the list. If there is no remaining stock for the current style, the dropdown should become inactive and read “OUT OF STOCK”.  */}
            <a>XS</a>
            <a>S</a>
            <a>M</a>
            <a>L</a>
            <a>XL</a>
          </div>
        </div>


        <div className={ProductCSS.dropdown}>
          <button className={ProductCSS.quantity} onClick={() => dropdownOnClick('quantity')}>1 <span>v</span></button>
          <div className={ProductCSS.dropdownMenu} id='quantity'>
            {/* The maximum selection will be capped by either the quantity of this style and size in stock, or a hard limit of 15. */}
            <a>1</a>
            <a>2</a>
            <a>3</a>
            <a>4</a>
          </div>
        </div>

      </div>
      <div>
        <button className={ProductCSS.add}>ADD TO BAG <span>+</span></button>
        <button className={ProductCSS.favorite}>star</button>
      </div>
    </div>
  );
}

export default Cart;