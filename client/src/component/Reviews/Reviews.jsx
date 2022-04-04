import React from 'react';
import axios from 'axios';
import Feed from './Feed.jsx';
import WriteReview from './WriteReview.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //should be receiving everything along with ID for ease from james
      product_id: 65632,
      reviewData: [],
      ratingAvg: 0,
      totalRatings: 0,
      wouldRecommend: 0

    };
    this.getReviewInfo = this.getReviewInfo.bind(this);
  }

  getReviewInfo() {
    axios.get(`reviews?page=1&count=300&sort=newest&product_id=${this.state.product_id}`)
      .then((result) => {
        //setting the review information to prop down
        var temp = result.data;
        console.log('in reviews GET',temp);
        var tempRatings = 0;
        var tempAvg = 0;
        var ratingCtr = 0;
        for (let i = 0; i < temp.length; i++) {
          ratingCtr++;
          tempRatings += temp[i].rating;
        }
        console.log(tempRatings, ratingCtr);
        tempAvg = tempRatings / ratingCtr;
        tempAvg = tempAvg.toFixed(1);

        //setting the % would reccoment value to prop
        var wouldRecommend = 0;
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].recommend === true) {
            wouldRecommend++;
          }
        }
        var recPct = 100 * (wouldRecommend / ratingCtr).toFixed(2);
        // console.log(recPct);

        this.setState({
          reviewData: temp,
          ratingAvg: tempAvg,
          totalRatings: ratingCtr,
          wouldRecommend: recPct
        })
        // console.log(recPct, this.state.wouldRecommend);
        // console.log(this.state.reviewData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //sample product ID's
  //65631, 65632, 65633,65634, 65635,
  componentDidMount() {
    this.getReviewInfo()
  }

  render() {
    return (
      <div>In Reviews
        <WriteReview />
        {/* will also need to prop meta data into it for characteristic info */}
        <Feed
          data={this.state.reviewData}
          ratingAvg={this.state.ratingAvg}
          ratings={this.state.totalRatings}
          wouldRecommend={this.state.wouldRecommend}
        />
      </div>
    )
  }
}

export default Reviews;