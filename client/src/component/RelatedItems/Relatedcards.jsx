import React from "react";
import Relateditem from "./Relateditem.jsx";
import RelateditemsCSS from "../cssModules/RelatedItems.module.css"
import axios from "axios";

class Relatedcards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //fake data. it will come from props
      product_id:this.props.currentProduct
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
      <div className={RelateditemsCSS.container}>
        {/* <button>left</button>
        <button>right</button> */}

        {this.props.data.map((item) => {
          //console.log("data>>>>",this.props.data)
           return <Relateditem key={item.id} item={item} changeProduct={this.props.changeProduct}/>;
        })}
      </div>
    );
  }
}

export default Relatedcards;
