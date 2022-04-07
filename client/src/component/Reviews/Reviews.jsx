import React from 'react';
import axios from 'axios';
import Feed from './Feed.jsx';
import WriteReview from './WriteReview.jsx';
import RatingsCharacteristics from './RatingsCharacteristics.jsx';
import ReviewsCSS from "../cssModules/Reviews.module.css";

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
      helpfulness: 0,
      reviewsArr: [],
      displayArr: [],
      currentlyDisplaying: 0
    };
    this.getMetaData = this.getMetaData.bind(this);
    this.getReviewInfo = this.getReviewInfo.bind(this);
    this.getTwoMore = this.getTwoMore.bind(this);
  }

  componentDidMount() {
    this.setState({
      product_id: this.props.id
    }, () => { this.getMetaData() })
    this.getReviewInfo();
    // this.getReviewsArr();
  }

  getReviewInfo() {
    axios.get(`reviews?page=1&count=300&sort=newest&product_id=${this.props.id}`)
      .then((result) => {
        var temp = result.data;

        var tempHelpfulness = 0;
        var tempRatings = 0;
        var tempAvg = 0;
        var ratingCtr = 0;

        //to get tempRatings/TempAvg/TotalRatings
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

        //getting the star reviews array
        var tempReviewsArr = [0, 0, 0, 0, 0];
    for (var i = 0; i < temp.length; i++) {
      tempReviewsArr[temp[i].rating - 1]++
    }
    // console.log(tempReviewsArr);

        //setting up initial render array
        var tempDisplayArr = [];
        var tempDisplay = 0
        if (tempReviewsArr.length === 1) {
          tempDisplayArr.push(temp[0]);
          tempDisplay = 1;
        } else {
          tempDisplayArr.push(temp[0], temp[1]);
          tempDisplay = 2;
        }
        // console.log(tempDisplay);
        this.setState({
          reviewData: temp,
          ratingAvg: tempAvg,
          totalRatings: ratingCtr,
          wouldRecommend: recPct,
          helpfulness: tempHelpfulness,
          reviewsArr: tempReviewsArr,
          displayArr: tempDisplayArr,
          currentlyDisplaying: tempDisplay
        })
      })
      .catch((err) => {
        console.log(err);
      });
}

  //gets meta and sets the reviews array
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

  getTwoMore() {
    console.log('in two more');
    console.log('currently displaying', this.state.currentlyDisplaying);
    console.log('current array display;', this.state.displayArr);

    // if()

  }

  render() {
    var loadingDiv;
    if (this.state.reviewData.length === 0) {
      loadingDiv = <div>Reviews are loading...</div>
    } else {
      loadingDiv = <div>
        <RatingsCharacteristics
          ratingAvg={this.state.ratingAvg}
          wouldRecommend={this.state.wouldRecommend}
          metaData={this.state.metaData}
          reviewsArr={this.state.reviewsArr}
        />
        <Feed
          reviewData={this.state.reviewData}
          totalRatings={this.state.totalRatings}
        />
      </div>
    }
    return (
      <div>
        {loadingDiv}
        <button
          className={ReviewsCSS.moreReviews}
          onClick={this.getTwoMore}
        >More Reviews</button>
      </div>
    )
  }
}

export default Reviews;

// // //65631, 65632, 65633,65634, 65635