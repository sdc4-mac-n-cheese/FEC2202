import React, { useState, useEffect } from "react";
import OutfitCSS from "../cssModules/Outfit.module.css";
import Outfitcard from "./Outfitcard.jsx";
import PropTypes from "prop-types";

function Outfitcards(props) {
  const [collection, setCollection] = useState(() => {
    let saved = localStorage.getItem("collection");
    let initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  function handleAdd() {
    let newAdd = {};
    newAdd.id = props.currProductData.id;
    newAdd.name = props.currProductData.name;
    newAdd.category = props.currProductData.category;
    newAdd.default_price = props.currProductData.default_price;
    newAdd.image =
      props.currStyle.photos[0].thumbnail_url ||
      "https://whetstonefire.org/wp-content/uploads/2020/06/image-not-available.jpg";
    if (localStorage.getItem("collection") === null) {
      let collection = [];
      collection.push(newAdd);
      localStorage.setItem("collection", JSON.stringify(collection));
      setCollection(collection);
    }
    let collection = localStorage.getItem("collection");
    if (collection.indexOf(`"id":${newAdd.id}`) === -1) {
      collection = JSON.parse(collection);
      collection.push(newAdd);
      localStorage.setItem("collection", JSON.stringify(collection));
      setCollection(collection);
      return;
    }
  }

  let handleUpdate = () => {
    let collection = JSON.parse(localStorage.getItem("collection"));
    setCollection(collection);
  };
  useEffect(() => {
    let collection = JSON.parse(localStorage.getItem("collection"));
    setCollection(collection);
  }, []);

  return (
    <>
      <h1 className={OutfitCSS.titie}>My Collection</h1>
      <div className={OutfitCSS.container}>
        <div className={OutfitCSS.firstcard}>
          <button className={OutfitCSS.addbutton} onClick={handleAdd}>
            <i className="fa fa-plus fa-5x" aria-hidden="true"></i>
          </button>
          <h3 className={OutfitCSS.text} onClick={handleAdd}>
            <strong>Add this outfit to your collection</strong>
          </h3>
        </div>
        {collection
          ? collection.map((item) => (
            <Outfitcard
              key={item.id}
              item={item}
              handleUpdate={handleUpdate}
            />
          ))
          : ""}
        <br></br>
      </div>
    </>
  );
}

Outfitcards.propTypes = {
  currStyle: PropTypes.object,
  currentProduct: PropTypes.number,
  currProductData: PropTypes.object,
};

export default Outfitcards;
