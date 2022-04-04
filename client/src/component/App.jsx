import React from 'react';
import ProductDetail from './ProductDetail/ProductDetail.jsx';
import Outfitcards from './Outfit/Outfitcards.jsx';
import Relatedcards from './RelatedItems/Relatedcards.jsx';
import QA from './QA/QA.jsx';
import Reviews from './Reviews/Reviews.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[]
    };
  }


componentDidMount(){
axios
.get("http://localhost:3000/products")
.then((res)=>{
  this.setState({data:res.data})
})
.catch((err)=>{console.log(err)})
}

  render() {
    return (
      <>
        <ProductDetail data={this.state.data}/>
        <Relatedcards data={this.state.data}/>
        <Outfitcards data={this.state.data}/>
        <QA data={this.state.data}/>
        <Reviews data={this.state.data}/>
      </>
    )
  }
}

export default App;
