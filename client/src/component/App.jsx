import React from 'react';
import ProductDetail from './ProductDetail/ProductDetail.jsx';
import Outfitcards from './Outfit/Outfitcards.jsx';
import Relatedcards from './RelatedItems/Relatedcards.jsx';
import QA from './QA/QA.jsx';
import Reviews from './Reviews/Reviews.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <ProductDetail />
        <Outfitcards />
        <Relatedcards />
        <QA />
        <Reviews />
      </>
    )
  }
}

export default App;
