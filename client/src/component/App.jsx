import React from "react";
import NavBar from './NavBar.jsx';
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
      currentProduct: 65631,
      currProductData: {},
      currStyleData: [],
      currStyle: {},
      relatedProducts: [],
    };
    this.changeProduct = this.changeProduct.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
  }

  componentDidMount() {
    axios.get(`/product?product_id=${this.state.currentProduct}`)
      .then(product => {
        this.setState({
          currProductData: product.data,
        });
        localStorage.setItem(this.state.currentProduct + ' currProductData', JSON.stringify(product.data));
        return axios.get(`/productStyle?product_id=${this.state.currentProduct}`);
      })
      .then(styles => {
        this.setState({
          currStyleData: styles.data.results,
          currStyle: styles.data.results[0]
        });
        localStorage.setItem(this.state.currentProduct + ' currStyleData', JSON.stringify(styles.data.results));
      })
      .catch(err => {
        console.log(err);
      });

    this.domupdating(this.state.currentProduct)
      .catch(err => {
        console.log(err);
      });
  }


  //---------------------->
  //another axios call to get all related data info
  domupdating(id) {

    return axios
      //hardcoded id number. need to be fixed
      .get("/relatedProduct", {
        params: { product_id: id },

      })
      .then((res) => {
        let relatedProductsData = [];

        for (var i = 0; i < res.data.length; i++) {
          let product_id = res.data[i];
          axios
            .get("/product", { params: { product_id: product_id } })
            .then((res) => {
              //------>another axios call to get the item thumbnail from the productstyle API
              axios
                .get("/productStyle", { params: { product_id: product_id } })
                .then((styleres) => {
                  //append the image information to the data
                  res.data.image =
                    styleres.data.results[0].photos[0].thumbnail_url;
                  relatedProductsData.push(res.data);
                  this.setState({ relatedProducts: relatedProductsData });
                })
                .catch((err) => {
                  console.log(err);
                });

            })

            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeProduct(product_id) {
    this.setState({ currentProduct: product_id });

    let currProduct = JSON.parse(localStorage.getItem(product_id + ' currProductData'));
    let currStyles = JSON.parse(localStorage.getItem(product_id + ' currStyleData'));
    console.log('current style', currStyles);

    if (currProduct) {
      this.setState({
        currProductData: currProduct,
        currStyleData: currStyles,
        currStyle: currStyles[0]
      });

      this.domupdating(product_id)
        .catch(err => {
          console.log(err);
        });
    } else {
      axios.get(`/product?product_id=${product_id}`)
        .then(product => {
          this.setState({
            currProductData: product.data
          });
          localStorage.setItem(this.state.currentProduct + ' currProductData', JSON.stringify(product.data));
          return axios.get(`/productStyle?product_id=${product_id}`);
        })
        .then(styles => {
          this.setState({
            currStyleData: styles.data.results,
            currStyle: styles.data.results[0]
          });
          localStorage.setItem(this.state.currentProduct + ' currStyleData', JSON.stringify(styles.data.results));

          return this.domupdating(product_id);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  //sets currStyle passed from product detail component
  changeStyle(style) {
    this.setState({
      currStyle: style
    });
  }

  render() {
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
