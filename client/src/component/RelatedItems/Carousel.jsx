import React, { useEffect, useState } from "react";
import RelateditemsCSS from "../cssModules/RelatedItems.module.css";
import Relateditem from "./Relateditem.jsx";


function Carousel(props) {

  const [currentIndex, setCurrentIndex] = useState(0);
  // const [length, setLength] = useState(props.data.length);
  const [list,setList]=useState([]);
  //console.log("list at inicial state line 11>>>>",list)
  //const [touchPosition, setTouchPosition]=useState(null)

  useEffect(() => {
    // console.log("props,data line 15>>>>",props.data)
    //  let filtereddata=props.data.slice(currentIndex, currentIndex+4)
    //  console.log("filtereddata line 17>>>",filtereddata)

     setList(props.data)
    // setLength(props.data.length);
    // console.log("from useeffect list>>>>",list)

  },[props.data]);
  //   console.log("children>>>>",children)
  //   console.log("currentIndex>>>>",currentIndex)
  const next = () => {
if ( currentIndex+4 < props.data.length){
    //alert("got clicked")--->button worked
 setCurrentIndex(currentIndex+1)
}
    // if (currentIndex < props.data.length - 4) {
    //   setCurrentIndex(currentIndex+1);
    //   console.log("currentIndex>>>",currentIndex)
    // }
    // else {setCurrentIndex(props.data.length-4)}

    // let filtereddata=props.data.slice(currentIndex,currentIndex+4)
    // setList(filtereddata)
  };
  const prev = () => {
    //alert("got clicked")---> button worked
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    //   console.log("currentIndex>>>",currentIndex)
    //  let filtereddata=props.data.slice(currentIndex,currentIndex+4)
    //  setList(filtereddata)

    }
  };


  return (
    <>
      <div className={`${RelateditemsCSS.related_carouselcontainer} scroll-targetRP`}>
        {/* <div className={RelateditemsCSS.related_carousel_wrapper}> */}
          {
          currentIndex > 0 &&
            <button onClick={prev}
            className={RelateditemsCSS.left_arrow}
            >
              <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
            </button>
          }
{/*
          <div className={RelateditemsCSS.related_content_wrapper}>
            <div
              className={RelateditemsCSS.related_carousel_content}
              //style={{ transform: `translateX(25%)` }}
            > */}
                {/* <button>left</button>
        <button>right</button> console.log("list at line 70>>>>",list)*/}
          {list.map((item,i) => {
           if (currentIndex+4>i && currentIndex <=i){
            return (
              <Relateditem
                key={item.id}
                item={item}
                changeProduct={props.changeProduct}
                currentProduct={props.currentProduct}
              />
            );}
          })}
          {currentIndex < props.data.length - 4 && <button onClick={next}
            className={RelateditemsCSS.right_arrow}
            >
             <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
            </button>
          }
        {/* </div> */}
      </div>
    </>
  );
}

export default Carousel;
