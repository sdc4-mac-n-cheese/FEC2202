import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import RelateditemsCSS from "../cssModules/RelatedItems.module.css";

// const Modal_styles ={
//     position: "fixed",
//     height:"500px",
//     width:"500px",
//     zIndex: 1041,
//     backgroundColor: "#FFF"
// }
// const Overlay_style={
//     position:"fixed",
//     top:0,
//     left:0,
//     right:0,
//     bottom:0,
//     backgroundColor:"rgba(0,0,0, .7)",
//     zIndex:1000

// }

var fakedata = [
  {
    feature: "Lenses",
    currentvalue: "Ultrasheen",
  },
  {
    feature: "UV Protection",

    comparedvalue: "nice protection",
  },
  {
    feature: "Frames",
    currentvalue: "LightCompose",
    comparedvalue: "supersolid",
  },
];



function Modal(props) {
  const [compareData, setCompareData] = useState([]);
  let composingdata = [];
  let currentitemdata = [];

  useEffect(() => {
    var compareditemdata = props.compareditem.features;
    for (var i = 0; i < compareditemdata.length; i++) {
      compareditemdata[i]["compareditemvalue"] = compareditemdata[i]["value"];
      delete compareditemdata[i]["value"];
      compareditemdata[i].currentitemvalue="";
      composingdata.push(compareditemdata[i])
      setCompareData(composingdata)
    }
    //console.log("compareditemdata>>>>>>",compareditemdata)
    axios
      .get("/product", { params: { product_id: props.currentitemid } })
      .then((res) => {
        //res.data is the currentitemdata
        for (var i = 0; i < res.data.features.length; i++) {
          res.data.features[i]["currentitemvalue"] =
            res.data.features[i]["value"];
          delete res.data.features[i]["value"];
          res.data.features[i].compareditemdata= ""
          composingdata.push(res.data.features[i]);
          setCompareData(composingdata)
        //    console.log("composingdata>>>", composingdata);
        //    console.log("compareData>>>", compareData);
        }
        //console.log("coms>>>",res.data)
      })
      .catch((err) => {
        console.log(err);
      });


  }, []);

  console.log("composingdata>>>>",composingdata)
    console.log("compareData>>>>", compareData);

  if (!props.open) return null;
  return ReactDom.createPortal(
    <>
      <div className={RelateditemsCSS.Overlay_style}></div>
      <div className={RelateditemsCSS.Modal_styles}>
        <button className={RelateditemsCSS.modalbutton} onClick={props.onClose}>
          X
        </button>
        <div className={RelateditemsCSS.tablediv}>
          <div className={RelateditemsCSS.table}>
            <table>
              <thead>
                <tr>
                  <th>Compared Item</th>
                  <th>Feature</th>
                  <th>Current Item</th>
                </tr>
              </thead>
              <tbody>
                {compareData.map((item) => (
                  <tr>
                    <td>{item.compareditemvalue}</td>
                    <td>{item.feature}</td>
                    <td>{item.currentitemvalue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
