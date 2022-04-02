import React from 'react';
import axios from 'axios';
import ReviewFeed from './ReviewItem.jsx';
import WriteReview from './WriteReview.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //get first 2 reviews
    //render out the comment

    //
  }

  render() {
    return (
      <h1>In Reviews
        <WriteReview />
        <ReviewFeed />

      </h1>
    )
  }
}

export default Reviews;