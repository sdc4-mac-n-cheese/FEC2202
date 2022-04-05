import React from "react";
import RelateditemsCSS from "../cssModules/RelatedItems.module.css";

class Relateditem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeItem = this.changeItem.bind(this);
  }
  changeItem(e) {
    e.preventDefault()
    this.props.changeProduct(this.props.item.id);
    
  }

  render() {
    console.log("item", this.props.item);
    console.log("image>>>>", this.props.item.image);
    return (
      <div className={RelateditemsCSS.card}>
        <button className={RelateditemsCSS.relateditembutton}></button>
        <h2 onClick={this.changeItem}>{this.props.item.name} </h2>
        <h3>{this.props.item.category}</h3>
        <p>{this.props.item.description}</p>
        <h3>{this.props.item.default_price}</h3>
        <img src={this.props.item.image} onClick={this.changeItem}></img>
        {/* has issue.cant show images*/}
      </div>
    );
  }
}

export default Relateditem;
