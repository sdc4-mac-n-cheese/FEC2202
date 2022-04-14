import React, { useEffect, useState } from "react";
import RelateditemsCSS from "../cssModules/RelatedItems.module.css";
import Relateditem from "./Relateditem.jsx";
import PropTypes from "prop-types";

function Carousel(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(props.data);
  }, [props.data]);

  const next = () => {
    if (currentIndex + 4 < props.data.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <div className={RelateditemsCSS.related_carouselcontainer}>
        {
          //currentIndex > 0 &&
          <button
            onClick={prev}
            className={
              currentIndex > 0
                ? RelateditemsCSS.left_arrow
                : RelateditemsCSS.empty_left_arraw
            }
          >
            <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
          </button>
        }
        {list.map((item, i) => {
          if (currentIndex + 4 > i && currentIndex <= i) {
            return (
              <Relateditem
                key={item.id}
                item={item}
                changeProduct={props.changeProduct}
                currentProduct={props.currentProduct}
              />
            );
          }
        })}
        {
          //currentIndex < props.data.length - 4 &&
          <button
            onClick={next}
            className={
              currentIndex<props.data.length-4 &&
               props.data.length>4
                  ? RelateditemsCSS.right_arrow
                  : 
              RelateditemsCSS.empty_right_arraw
            }
          >
            <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
          </button>
        }
      </div>
    </>
  );
}

Carousel.propTypes = {
  data: PropTypes.array,
  changeProduct: PropTypes.func,
  currentProduct: PropTypes.number,
};

export default Carousel;
