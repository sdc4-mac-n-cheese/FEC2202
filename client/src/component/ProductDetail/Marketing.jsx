import React from 'react';
import PropTypes from 'prop-types';
import ProductCSS from '../cssModules/ProductDetail.module.css';

const Marketing = (props) => {
  return (
    <div className={ProductCSS.marketingContainer}>
      <div className={ProductCSS.marketingCopy}>
        <h3>{props.product.slogan}</h3>
        <p>{props.product.description}</p>
      </div>
      <div className={ProductCSS.marketingPoints}>
        <p><i className="fa fa-check" aria-hidden="true"></i> GMO and Pesticide-free</p>
        <p><i className="fa fa-check" aria-hidden="true"></i> Give us money</p>
        <p><i className="fa fa-check" aria-hidden="true"></i> Are you really reading this</p>
        <p><i className="fa fa-check" aria-hidden="true"></i> Stuff and some more stuff</p>
      </div>
    </div>
  );
}

Marketing.propTypes = {
  product: PropTypes.object
}

export default Marketing;