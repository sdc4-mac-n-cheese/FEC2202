import React from "react";
import RelateditemsCSS from "../cssModules/RelatedItems.module.css";
import Modal from "./Modal.jsx";
import PropTypes from 'prop-types';

class Relateditem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        openModal:false
    };
    this.changeItem = this.changeItem.bind(this);
  }
  changeItem(e) {
    e.preventDefault()
    this.props.changeProduct(this.props.item.id);
    // console.log('THE id', this.props.item.id)

  }
  

  render() {
    
    // console.log("item", this.props.item);
    // console.log("image>>>>", this.props.item.image);
    return (
      <div className={RelateditemsCSS.card}>
        <button className={RelateditemsCSS.relateditembutton} onClick={()=>{this.setState({openModal:true})}}>&#9733;</button>
        <br/>
        <h2 onClick={this.changeItem}>{this.props.item.name} </h2>
        <h3>{this.props.item.category}</h3>
        <p>{this.props.item.description}</p>
        <h3>{this.props.item.default_price}</h3>
        <img src={this.props.item.image || "https://whetstonefire.org/wp-content/uploads/2020/06/image-not-available.jpg"} onClick={this.changeItem} className={RelateditemsCSS.relateditemimg}></img>
        {/* has issue.cant show images*/}
        <div className={RelateditemsCSS.modalparent}>
        <Modal open={this.state.openModal} onClose={()=>{this.setState({openModal:false})}} compareditem={this.props.item} currentitemid={this.props.currentProduct}/>
        </div>
      </div>
    );
  }
}

Relateditem.propTypes = {
  name: PropTypes.string,
  productId: PropTypes.number,
  item: PropTypes.object,
  changeProduct: PropTypes.func,
  currentProduct: PropTypes.number

}

export default Relateditem;
