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
    this.state = {
      product_id: 65631,
    };
  }


  componentDidMount() {
  }

  // getMetaData() {
  //   axios.get(`reviews/meta?product_id=${this.state.product_id}`)
  //     .then((result) => {
  //       console.log(result);
  //       var temp = [];
  //       temp.push(result.data);
  //       this.setState({
  //         metaData: temp
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // console.log('no success')
  //     })
  // }

  render() {
    return (
      <>
        <ProductDetail data={this.state.data}/>
        <Relatedcards data={this.state.data}/>
        <Outfitcards data={this.state.data}/>
        <QA data={this.state.data}/>
        <Reviews id={this.state.product_id}/>
      </>
    )
  }
}

export default App;
