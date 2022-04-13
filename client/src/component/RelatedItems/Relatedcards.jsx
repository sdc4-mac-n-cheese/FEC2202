import React, { useState, useEffect } from "react";
import RelateditemsCSS from "../cssModules/RelatedItems.module.css";
import PropTypes from 'prop-types';
import Carousel from "./Carousel.jsx";
//import { useEffect, useState } from "react";
import axios from "axios";


function Relatedcards(props) {
  const [relatedProducts, setRelatedProducts] = useState([])
  //const [datalength,setDatalength]=useState(0)
  // const [currentProduct,setCurrentProduct]=useState(0)

  // const changeProduct=(product_id)=>{
  // setCurrentProduct(product_id)
  // }

  function changeinRelated(val) {
    // setCurrentProduct(val)
    axios
      .get("/relatedProduct", {
        params: { product_id: val || props.currentProduct },

      })
      .then((res) => {
        //console.log("line89",id)
        let relatedProductsData = [];
        //for loop gather related products data
        // console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          let product_id = res.data[i];

          axios
            .get("/product", { params: { product_id: product_id } })
            .then(function (res) {
              //------>another axios call to get the item thumbnail from the productstyle API
              axios
                .get("/productStyle", { params: { product_id: product_id } })
                .then((styleres) => {
                  //     console.log("styleres>>>>", styleres.data);
                  //append the image information to the data
                  res.data.image =
                    styleres.data.results[0].photos[0].thumbnail_url;
                  //  console.log("image", res.data.image);
                  relatedProductsData.push(res.data);
                  setRelatedProducts(relatedProductsData);
                  //console.log("line111",this.state.relatedProductsData)
                })

                .catch((err) => {
                  console.log(err);
                });

              // console.log("res>>>>>",res.data)
              // relatedProductsData.push(res.data);
              //console.log("relatedproductsData>>>>",relatedProductsData)
              // this.setState({ relatedProducts: relatedProductsData });
              //  console.log(
              //    "staterelatedproducts>>>>",
              //    this.state.relatedProducts
              //  );
            })

            .catch((err) => {
              console.log(err);
            });
        }
        // console.log("res.data>>>>>",res.data)
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
          <h1 className={RelateditemsCSS.title}>Related products</h1>
          <div className={RelateditemsCSS.container}>
            <div
            // style={{ maxWidth: "1500px", marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}
            >
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

// class Relatedcards extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       //fake data. it will come from props
//       product_id: this.props.currentProduct.id,
//     };
//   }

//   //   componentdidMount(){
//   //     //this need to be changed to this.props.
//   //   //  let theProductid=this.state.product_id
//   //  alert("componentdidmount")
//   //   axios.get('/relatedProduct',{params:{product_id:this.state.product_id}})
//   //   .then(res=>{
//   //     console.log(res.data)
//   //   })
//   //   .catch(err=>{
//   //     console.log(err)
//   //   })
//   //   }
//   //console.log(props)

//   render() {
//     return (
//       <>
//       <div
//       style={{ "margin-Bottom":"30px"}}
//       >
//         <h1 className={RelateditemsCSS.title}>Related products</h1>
//         <div className={RelateditemsCSS.container}>
//       <div
//       // style={{ maxWidth: "1500px", marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}
//       >
//       <Carousel show={4} data={this.props.data} changeProduct={this.props.changeProduct}
//                 currentProduct={this.props.currentProduct}></Carousel>
//         </div>
//         </div>
//         </div>
//         {/* {this.props.data.map((item) => {
//           // console.log("data from relatedcards file>>>>",this.props.data)
//            return <Relateditem key={item.id} item={item} changeProduct={this.props.changeProduct}
//            currentProduct={this.props.currentProduct}/>;
//         })}
//       </div> */}
//       </>
//     );
//   }
// }

Relatedcards.propTypes = {
  data: PropTypes.array,
  changeProduct: PropTypes.func,
  currentProduct: PropTypes.number,
};
//export default Relatedcards;
