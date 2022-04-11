import React, { useEffect, useState } from "react";
import RelateditemsCSS from "../cssModules/RelatedItems.module.css";

function Carousel(props) {
  const { children, show } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLengh] = useState(children.length);
  //const [touchPosition, setTouchPosition]=useState(null)

  useEffect(() => {
    setLengh(children.length);
  }, [children]);
//   console.log("children>>>>",children)
//   console.log("currentIndex>>>>",currentIndex)
  const next = () => {

     // console.log("length>>>>",length)
    //  console.log("length-show",(length-show))
    if (currentIndex < (length - show)) {
      setCurrentIndex(prevState => prevState + 1
    );
     // console.log("length>>>>",length)
    }
  };
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  // const handleTouchState=(e)=>{
  //     const touchDown=e.touches[0].clientX
  //     setTouchPosition(touchDown)
  // }

  return (
    <>
      <div className={RelateditemsCSS.related_carouselcontainer}>
        <div className={RelateditemsCSS.related_carousel_wrapper}>
          {currentIndex > 0 &&
            <button onClick={prev} className={RelateditemsCSS.left_arrow}>
              &lt;
            </button>
          }

          <div>
              <div
                className={RelateditemsCSS.related_carousel_content}
                style={{ transform: `translateX(-${currentIndex * 25}%)` }}
              >
                {children}
              </div>
           

            {currentIndex < (length - show) &&
              <button onClick={next} className={RelateditemsCSS.right_arrow}>
                &gt;
              </button>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Carousel;
