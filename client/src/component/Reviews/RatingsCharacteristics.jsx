import React from 'react';

class RatingsCharacteristics extends React.Component {
  constructor(props) {
    //Props
    // this.props.totalReviews
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>Avg Rating: {this.props.ratingAvg}</div>
        <div>Customers Recommendation Rating: {this.props.wouldRecommend}</div>
        <br></br>
      </div>
    )
  }
}

export default RatingsCharacteristics;