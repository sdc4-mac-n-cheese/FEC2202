import React from 'react';

class RatingsCharacteristics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsArr: [],
      reviews: 0,
      mostVotes: 0
    };
    this.getReviews = this.getReviews.bind(this);
  }

  componentDidMount() {
    this.setState({
      reviewsArr: this.props.reviewsArr}, () => {this.getReviews()});
  }

  getReviews() {
    var tempReviews = 0;
    for (let i = 0; i < this.props.reviewsArr.length; i++) {
      tempReviews += (this.props.reviewsArr[i]);
    }
    // console.log(tempReviews);
    this.setState({
      reviews: tempReviews
    })
  }
  render() {
    return (
      <>
        <div>Avg Rating: {this.props.ratingAvg}</div>
        <div>Customers Recommendation Rating: {this.props.wouldRecommend}</div>
        <br></br>
    </>
    )
  }
}

export default RatingsCharacteristics;