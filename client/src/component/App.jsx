import React from "react";
import ProductDetail from "./ProductDetail/ProductDetail.jsx";
import Outfitcards from "./Outfit/Outfitcards.jsx";
import Relatedcards from "./RelatedItems/Relatedcards.jsx";
import QA from "./QA/QA.jsx";
import Reviews from "./Reviews/Reviews.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //data:[],
      relatedProducts: [],
      currentProduct: 65632,
    };
    this.changeProduct = this.changeProduct.bind(this);
  }

  componentDidMount() {
    // axios
    // .get("http://localhost:3000/products")
    // .then((res)=>{
    //   this.setState({data:res.data})
    // })
    // .catch((err)=>{console.log(err)})

    //---------------------->
    //another axios call to get all related data info
    axios
      //hardcoded id number. need to be fixed
      .get("/relatedProduct", {
        params: { product_id: this.state.currentProduct },
      })

      .then((res) => {
        //console.log("related items res.data>>>>", res.data);
        let relatedProductsData = [];
        //for loop gather related products data
        for (var i = 0; i < res.data.length; i++) {
          let product_id = res.data[i];

          axios
            .get("/product", { params: { product_id: product_id } })
            .then((res) => {
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
                  this.setState({ relatedProducts: relatedProductsData });
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
    //console.log("state related prodcut data>>>",this.state.relatedProducts)
  }

  changeProduct(val) {
    this.setState({ currentProduct: val });
    // console.log('change product', val);
    // console.log('change product', this.state.currentProduct)
    this.componentDidMount();
  }

  render() {
    return (
      <>
      
        <ProductDetail
          data={this.state.data}
          currentProduct={this.state.currentProduct}
        />
        <Relatedcards
          data={this.state.relatedProducts}
          currentProduct={this.state.currentProduct}
          changeProduct={this.changeProduct}
        />
        <Outfitcards
       
          currentProduct={this.state.currentProduct}
        />
        <QA
          id={this.state.currentProduct}
        />
        <Reviews
          id={this.state.currentProduct}
        />
      </>
    );
  }
}

export default App;
