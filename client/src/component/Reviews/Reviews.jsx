import React from 'react';
import axios from 'axios';
import Feed from './Feed.jsx';
import WriteReview from './WriteReview.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metaData: [],
      product_id: 0,
      reviewData: [],
      ratingAvg: 0,
      totalRatings: 0,
      wouldRecommend: 0,
      helpfulness: 0
    };
    this.getMetaData = this.getMetaData.bind(this);
    this.getReviewInfo = this.getReviewInfo.bind(this);
  }

  componentDidMount() {
    this.setState({
      product_id: this.props.id
    }, () => { this.getMetaData() })
    this.getReviewInfo();
  }

  getReviewInfo() {
    axios.get(`reviews?page=1&count=300&sort=newest&product_id=${this.props.id}`)
      .then((result) => {
        var temp = result.data;

        var tempHelpfulness = 0;
        var tempRatings = 0;
        var tempAvg = 0;
        var ratingCtr = 0;
        for (let i = 0; i < temp.length; i++) {
          ratingCtr++;
          tempRatings += temp[i].rating;
        }
        tempAvg = tempRatings / ratingCtr;
        tempAvg = tempAvg.toFixed(1);

        //setting the % would reccoment value to prop
        var wouldRecommend = 0;
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].recommend === true) {
            wouldRecommend++;
          }
          tempHelpfulness += temp[i].helpfulness;
        }
        var recPct = 100 * (wouldRecommend / ratingCtr).toFixed(2);

        this.setState({
          reviewData: temp,
          ratingAvg: tempAvg,
          totalRatings: ratingCtr,
          wouldRecommend: recPct,
          helpfulness: tempHelpfulness
        })
      })
      .catch((err) => {
        console.log(err);
      });
}


  getMetaData() {
    axios.get(`reviews/meta?product_id=${this.state.product_id}`)
      .then((result) => {
        // console.log(result);
        var temp = [];
        temp.push(result.data);
        this.setState({
          metaData: temp
        })
      })
      .catch((err) => {
        console.log(err);
        // console.log('no success')
      })
  }

  render() {
    var loadingDiv;
    if (this.state.metaData.length === 0) {
      loadingDiv = <div>Reviews are loading...</div>
    } else {
      loadingDiv = <div><h5>Reviews finished loading</h5><Feed ratingAvg={this.state.ratingAvg} reviewData={this.state.reviewData} wouldRecommend={this.state.wouldRecommend} totalRatings={this.state.totalRatings}/></div>
    }
    return (
      <div>
        In Reviews
        {loadingDiv}
      </div>
    )
  }
}

export default Reviews;

// // //65631, 65632, 65633,65634, 65635