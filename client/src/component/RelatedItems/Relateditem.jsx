import React, { useState, useEffect } from "react";
import RelateditemsCSS from "../cssModules/RelatedItems.module.css";
import Modal from "./Modal.jsx";
import PropTypes from "prop-types";
import { starReview } from "../functions.jsx";
import axios from "axios";

function Relateditem(props) {
  const [openModal, setOpenModal] = useState(false);
  const [averagescore, setAveragescore] = useState(0);

  useEffect(() => {
    axios
      .get("/reviews/meta", { params: { product_id: props.item.id } })
      .then((res) => {
        let average = 0;
        if (!res.data.ratings) {
          setAveragescore(0);
        } else {
          let counter = 0;
          let sumscore = 0;
          for (const [star, num] of Object.entries(res.data.ratings)) {
            counter += Number(num);
            sumscore += Number(star) * Number(num);
          }
          average = sumscore / counter;
          setAveragescore(average);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.item.id]);

  const changeItem = (e) => {
    e.preventDefault();
    props.changeProduct(props.item.id);
    props.changeinRelated(props.item.id);
  };

  
  return (
    <div
      className={RelateditemsCSS.card}
    >
      <img
        src={
          props.item.image ||
          "https://whetstonefire.org/wp-content/uploads/2020/06/image-not-available.jpg"
        }
        onClick={changeItem}
        className={RelateditemsCSS.relateditemimg}
      ></img>
      <button
        className={RelateditemsCSS.relateditembutton}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <i className="fa fa-gratipay fa-2x" aria-hidden="true"></i>
      </button>
      <br />
      <p>
        {props.item.category}
        <br />
      </p>
      <h3 onClick={changeItem}>{props.item.name} </h3>
      {starReview(averagescore, RelateditemsCSS)}
      <span>
        <strong>${props.item.default_price}</strong>
      </span>
      <div className={RelateditemsCSS.modalparent}>
        <Modal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
          compareditem={props.item}
          currentitemid={props.currentProduct}
        />
      </div>
    </div>
  );
}

Relateditem.propTypes = {
  name: PropTypes.string,
  productId: PropTypes.number,
  item: PropTypes.object,
  changeProduct: PropTypes.func,
  currentProduct: PropTypes.number,
  changeinRelated: PropTypes.func,
};

export default Relateditem;
