import React from "react";
import Relateditem from "./Relateditem.jsx";
import RelateditemsCSS from "../cssModules/RelatedItems.module.css";
import PropTypes from 'prop-types';
import Carousel from "./Carousel.jsx";
//import axios from "axios";

class Relatedcards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //fake data. it will come from props
      product_id: this.props.currentProduct.id,
    };
  }

  //   componentdidMount(){
  //     //this need to be changed to this.props.
  //   //  let theProductid=this.state.product_id
  //  alert("componentdidmount")
  //   axios.get('/relatedProduct',{params:{product_id:this.state.product_id}})
  //   .then(res=>{
  //     console.log(res.data)
  //   })
  //   .catch(err=>{
  //     console.log(err)
  //   })
  //   }
  //console.log(props)

  render() {
    return (
      <>
        <h1 className={RelateditemsCSS.title}>Related products</h1>
        <div className={RelateditemsCSS.container}>
      <div 
      style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}
      >
      <Carousel show={4} >
          {/* <button>left</button>
        <button>right</button> */}
          {this.props.data.map((item) => {
            return (
              <Relateditem
                key={item.id}
                item={item}
                changeProduct={this.props.changeProduct}
                currentProduct={this.props.currentProduct}
              />
            );
          })}
          </Carousel>
        </div>
        </div>
      </>
    );
  }
}

Relatedcards.propTypes = {
  data: PropTypes.array,
  changeProduct: PropTypes.func,
  currentProduct: PropTypes.number,
};
export default Relatedcards;
