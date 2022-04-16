import React, { useState, useEffect } from "react";
import RelateditemsCSS from "../cssModules/RelatedItems.module.css";
import PropTypes from 'prop-types';
import Carousel from "./Carousel.jsx";
import axios from "axios";

function Relatedcards(props) {
  const [relatedProducts, setRelatedProducts] = useState([])

  function changeinRelated(val) {
    axios
      .get("/relatedProduct", {
        params: { product_id: val || props.currentProduct },
      })
      .then((res) => {
        let relatedProductsData = [];
        for (var i = 0; i < res.data.length; i++) {
          let product_id = res.data[i];

          axios
            .get("/product", { params: { product_id: product_id } })
            .then(function (res) {

              axios
                .get("/productStyle", { params: { product_id: product_id } })
                .then((styleres) => {
                  res.data.image =
                    styleres.data.results[0].photos[0].thumbnail_url;
                  relatedProductsData.push(res.data);
                  setRelatedProducts(relatedProductsData);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => {
    console.log("mounted")
    console.log("relatedproducts>>>", relatedProducts)
    changeinRelated(
      console.log("envoked")
    )
  }, [props.currentProduct])



  return (
    <div>
      {relatedProducts.length &&
        <div
          style={{ "margin-Bottom": "30px" }}
        >
          <h1 className={`${RelateditemsCSS.title} scroll-targetRP`}>Related Products</h1>
          <div className={RelateditemsCSS.container}>
            <div>
              <Carousel data={props.data} changeProduct={props.changeProduct} changeinRelated={changeinRelated}
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

