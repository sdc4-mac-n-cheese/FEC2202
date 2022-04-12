import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import RelateditemsCSS from "../cssModules/RelatedItems.module.css";


const Modal =function(props) {
  const [compareData, setCompareData] = useState(props.compareditem.features);
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
         // console.log("newdataset loging line 87>>>>",newdataset)
      }
      // console.log("compareddata>>>>",compareddata)
      // console.log("currentdata>>>",currentdata)
      
      for (let i=0;i<compareddata.length;i++){
          for (let j=0; j<currentdata.length; j++){
              if (compareddata[i].feature===currentdata[j].feature){
                  currentdata[j].compareditemvalue=compareddata[i].compareditemvalue
                //compareddata.splice(i,1)
              }
          }
      }
      for (let k=0;k<currentdata.length;k++){
          if(currentdata[k].compareditemvalue===undefined){
              currentdata[k].compareditemvalue=""
          }
          newdataset.push(currentdata[k])
         // console.log("newdataset>>>>>>>",newdataset)
         const uniqueFeatures=[]
const unique=newdataset.filter(element=>{
    const isDuplicate=uniqueFeatures.includes(element.feature);
 if(!isDuplicate){
     uniqueFeatures.push(element.feature);
     return true;
 }
})
          setCompareData(unique)
         // console.log("compareData state >>>>",compareData)
      }
      

        //console.log("coms>>>",res.data)
      })
      .catch((err) => {
        console.log(err);
      });


  },[props.currentitemid,props.compareditem]);

  // console.log("composingdata>>>>",composingdata)
  //   console.log("compareData>>>>", compareData);

  if (!props.open) return null;
  return ReactDom.createPortal(
    <>
      <div className={RelateditemsCSS.Overlay_style} ></div>
      <div className={RelateditemsCSS.Modal_styles}>
        <button className={RelateditemsCSS.modalbutton} onClick={props.onClose}>
        <i className="fa fa-times" aria-hidden="true"></i>
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
