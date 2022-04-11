import React, { useState, useEffect } from "react";
import OutfitCSS from "../cssModules/Outfit.module.css";
import PropTypes from "prop-types";
import axios from "axios";
import { starReview } from "../functions.jsx";

function Outfitcard(props) {
  const [averagescore, setAveragescore] = useState(0);
  //const [starreview, setStarreivew]=useState(<div></div>)

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
          //console.log("counter,sumscore",counter,sumscore)
          average = sumscore / counter;
          setAveragescore(average);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //console.log("averagescore>>>>",averagescore)
  const handledelete = () => {
    let collection = JSON.parse(localStorage.getItem("collection"));
    // console.log("getting inforamtion from localstorage>>>>",collection)
    // console.log(props.item.id)
    let newcollection = collection.filter(
      (collectitem) => props.item.id !== collectitem.id
    );
    //console.log("after filter collection",newcollection)
    localStorage.setItem("collection", JSON.stringify(newcollection));
    props.handleUpdate();
  };

  return (
    <div className={OutfitCSS.card} enzyme-test="outfitcard">
      <div className={OutfitCSS.imageparent}>
        <button
          className={OutfitCSS.outfitcardbutton}
          onClick={handledelete}
          enzyme-test="deleteoutfitbutton"
        >
          <i className="fa fa-times fa-2x" aria-hidden="true"></i>
        </button>
        <img className={OutfitCSS.image} src={props.item.image}></img>
      </div>
      <p>{props.item.category}</p>
      <h3>{props.item.name}</h3>
      {starReview(averagescore, OutfitCSS)}

      {/* <h2>review star placeholder</h2> */}
      {/* <div style={{"background-color":"yellow"}}>
      {<div className={OutfitCSS.Stars} style={{"--rating": 2.3}} aria-label={"Rating of this product is 2.3 out of 5."}></div> }
      <div style={{"backgroud":"linear-gradient(90deg, #eee 30%, #fff 70%"}}>☆☆☆☆☆ </div>  
      </div>*/}
      <span>
        <strong>${props.item.default_price}</strong>
      </span>
    </div>
  );
}

Outfitcard.propTypes = {
  item: PropTypes.object,
  handleUpdate: PropTypes.func,
};

export default Outfitcard;
