import React from "react";
import NavBar from './NavBar.jsx';
import ProductDetail from "./ProductDetail/ProductDetail.jsx";
import Outfitcards from "./Outfit/Outfitcards.jsx";
import Relatedcards from "./RelatedItems/Relatedcards.jsx";
import QA from "./QA/QA.jsx";
import Reviews from "./Reviews/Reviews.jsx";
import axios from "axios";
import {starReview} from "./functions.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: 65631,
      currProductData: {},
      currStyleData: [],
      currStyle: {},
      relatedProducts: [],
    };
    this.changeProduct = this.changeProduct.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.domupdating=this.domupdating.bind(this)
  }
  
  componentDidMount(){
   // console.log("window.location>>>>>>>",window.location)
    this.domupdating()
    document.title="Best E-commerce Site"

  }

  domupdating() {
    //current product based off of current product_id
    axios.get(`/product?product_id=${this.state.currentProduct}`)
      .then(product => {
        this.setState({
          currProductData: product.data
        });
        return axios.get(`/productStyle?product_id=${this.state.currentProduct}`);
      })
      .then(styles => {
        this.setState({
          currStyleData: styles.data.results,
          currStyle: styles.data.results[0]
        });
      })
      .catch(err => {
        console.log(err);
      });


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
        // console.log(res.data);
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

  changeProduct(product_id) {
    this.setState({ currentProduct: product_id });
    this.domupdating()
    // console.log('change product-----------------', product_id);
    // console.log('change product', this.state.currentProduct)
    // this.componentDidMount();

    axios.get(`/product?product_id=${product_id}`)
      .then(product => {
        this.setState({
          currProductData: product.data
        });
        return axios.get(`/productStyle?product_id=${product_id}`);
      })
      .then(styles => {
        this.setState({
          currStyleData: styles.data.results,
          currStyle: styles.data.results[0]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  //sets currStyle passed from product detail component
  changeStyle(style) {
    this.setState({
      currStyle: style
    });
  }

  render() {
    // console.log('CURRENT STYLE', this.state.currStyle)
    return (
      <>
        <NavBar />
        <ProductDetail
          currProductData={this.state.currProductData}
          currStyleData={this.state.currStyleData}
          changeStyle={this.changeStyle}
        />
        <Relatedcards
          data={this.state.relatedProducts}
          currentProduct={this.state.currentProduct}
          changeProduct={this.changeProduct}
        />
        <Outfitcards
          currStyle={this.state.currStyle}
          currentProduct={this.state.currentProduct}
          currProductData={this.state.currProductData}
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
