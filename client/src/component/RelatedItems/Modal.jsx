import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import RelateditemsCSS from "../cssModules/RelatedItems.module.css";
//import PropTypes from 'prop-types';

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

// var fakedata = [
//   {
//     feature: "Lenses",
//     currentvalue: "Ultrasheen",
//   },
//   {
//     feature: "UV Protection",

//     comparedvalue: "nice protection",
//   },
//   {
//     feature: "Frames",
//     currentvalue: "LightCompose",
//     comparedvalue: "supersolid",
//   },
// ];



const Modal =function(props) {
  const [compareData, setCompareData] = useState([]);
  let composingdata = [];
  let compareddata=[]
  var newdataset=[]
  let currentdata=[]
  //let currentitemdata = [];

  useEffect(() => {
   // console.log("modal props>>>>>>",props.compareditem)
    var compareditemdata = props.compareditem.features;
    for (var i = 0; i < compareditemdata.length; i++) {
      if(compareditemdata[i]["value"] === null){
        compareditemdata.splice(i,1)
      } else{
      compareditemdata[i]["compareditemvalue"] = compareditemdata[i]["value"];
      delete compareditemdata[i]["value"];
      compareditemdata[i].currentitemvalue="";
      compareddata.push(compareditemdata[i])
        
      //setCompareData(comparedata)
     // composingdata=[]
    }
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
           currentdata=composingdata
         // setCompareData(currentdata)
         

//           var newdataset=[]
// for (let i=0;i<currentitemdata.length;i++){
//     for (let j=0;j<compareditemdata.length; j++){
//         if(currentitemdata[i].feature ===compareditemdata[j].feature){
//             compareditemdata[j].currentitemvalue=currentitemdata[i].currentitemvalue
//         }
//     }
//     }
// for (let k=0;k<compareditemdata.length;k++){
//     if(compareditemdata[k].currentitemvalue===undefined){
//         compareditemdata[k].currentitemvalue =""
//     }  newdataset.push(compareditemdata[k])
// }
// // console.log("compareddata>>>>",compareddata)
// // console.log("currentdata>>>",currentdata)

// for (let i=0;i<compareditemdata.length;i++){
//     for (let j=0; j<currentitemdata.length; j++){
//         if (compareditemdata[i].feature===currentitemdata[j].feature){
//           //  currentdata[j].compareditemvalue=compareddata[i].compareditemvalu
//          currentitemdata.splice(j,1)
            
//         }
//     }
// }
// for (let k=0;k<currentitemdata.length;k++){
//     if(currentitemdata[k].compareditemvalue===undefined){
//         currentitemdata[k].compareditemvalue=""
        
//     }
//     newdataset.push(currentdata[k])
// }
        //    console.log("composingdata>>>", composingdata);
        //    console.log("compareData>>>", compareData);
        }
        for (let i=0;i<currentdata.length;i++){
          for (let j=0;j<compareddata.length; j++){
              if(currentdata[i].feature ===compareddata[j].feature){
                  compareddata[j].currentitemvalue=currentdata[i].currentitemvalue
              }
          }
          }
      for (let k=0;k<compareddata.length;k++){
          if(compareddata[k].currentitemvalue===undefined){
              compareddata[k].currentitemvalue =""
          }  newdataset.push(compareddata[k])
          console.log("newdataset loging line 87>>>>",newdataset)
      }
      // console.log("compareddata>>>>",compareddata)
      // console.log("currentdata>>>",currentdata)
      
      for (let i=0;i<compareddata.length;i++){
          for (let j=0; j<currentdata.length; j++){
              if (compareddata[i].feature===currentdata[j].feature){
                  currentdata[j].compareditemvalue=compareddata[i].compareditemvalue
                compareddata.splice(i,1)
              }
          }
      }
      for (let k=0;k<currentdata.length;k++){
          if(currentdata[k].compareditemvalue===undefined){
              currentdata[k].compareditemvalue=""
          }
          newdataset.push(currentdata[k])
          console.log("newdataset>>>>>>>",newdataset)
          setCompareData(newdataset)
          console.log("compareData state >>>>",compareData)
      }
      

        //console.log("coms>>>",res.data)
      })
      .catch((err) => {
        console.log(err);
      });


  }, []);

  // console.log("composingdata>>>>",composingdata)
  //   console.log("compareData>>>>", compareData);

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
                  <tr key={item.index}>
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


// Modal.propTypes = {
//   compareditemvalue: PropTypes.string,
//   feature: PropTypes.string,
//   currentitemvalue: PropTypes.string,
// }

export default Modal;
