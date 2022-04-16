import React, { useState, useEffect } from "react";
import RelateditemsCSS from "../cssModules/RelatedItems.module.css";
import PropTypes from 'prop-types';
import Carousel from "./Carousel.jsx";

function Relatedcards(props) {
  useEffect(() => {
    // console.log("mounted")
    // console.log("relatedproducts>>>", relatedProducts)
    // changeinRelated(
    //   console.log("envoked")
    // )
  }, [props.currentProduct])

  return (
    <div>
      {
        <div
          style={{ "margin-Bottom": "30px" }}
        >
          <h1 className={`${RelateditemsCSS.title} scroll-targetRP`}>Related Products</h1>
          <div className={RelateditemsCSS.container}>
            <div>
              <Carousel data={props.data} changeProduct={props.changeProduct}
                currentProduct={props.currentProduct}></Carousel>
            </div>
          </div>
        </div>
      }
    </div>
  )

}

export default Relatedcards

Relatedcards.propTypes = {
  data: PropTypes.array,
  changeProduct: PropTypes.func,
  currentProduct: PropTypes.number,
};

