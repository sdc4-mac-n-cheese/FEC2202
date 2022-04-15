import React from 'react';
import axios from 'axios';
import Feed from './Feed.jsx';
import RatingsCharacteristics from './RatingsCharacteristics.jsx';
import PropTypes from 'prop-types';
import ReviewsCSS from '../cssModules/Reviews/Reviews.module.css';
import Characteristics from './Characteristics.jsx';

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
      displayFilters: false,
      sortType: 'relevant',
      currentRatingFilter: [0, 0, 0, 0, 0],
      helpfulRatings: []
    };
    this.getMetaData = this.getMetaData.bind(this);
    this.getReviewInfo = this.getReviewInfo.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.viewFilters = this.viewFilters.bind(this);
    this.changeRatingFilter = this.changeRatingFilter.bind(this);
  }

  componentDidMount() {
    this.setState({
      product_id: this.props.id,
    },
      () => {
        this.getMetaData();
        this.getReviewInfo();
      })

    // this.getReviewsArr();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props.id, prevProps.id, this.state.product_id);
    if (this.props.id !== prevProps.id) {
      this.componentDidMount();
    }

    // console.log('current:',this.state.sortType, '\nprevious:',prevState.sortType);
    if (this.state.sortType !== prevState.sortType) {
      this.componentDidMount();
    }



  }
  // ?page=1&count=200&sort=newest&product_id=65633
  getReviewInfo() {
    axios.get(`reviews/?page=1&count=100000&sort=${this.state.sortType}&product_id=${this.props.id}`)
      .then((result) => {
        var temp = result.data;

        var initialPageFilterFlag = true;
        for (let i = 0; i < this.state.currentRatingFilter.length; i++) {
          if (this.state.currentRatingFilter[i] !== 0) {
            initialPageFilterFlag = false;
          }
        }

        if(initialPageFilterFlag) {
        var tempHelpfulness = 0;
        var tempRatings = 0;
        var tempAvg = 0;
        var ratingCtr = 0;
        var temphelpfulRatings = [];
        //to get tempRatings/TempAvg/TotalRatings
        for (let i = 0; i < temp.length; i++) {
          ratingCtr++;
          tempRatings += temp[i].rating;
          temphelpfulRatings.push(temp[i].helpfulness)
        }

        tempAvg = tempRatings / ratingCtr;
        tempAvg = tempAvg.toFixed(1);
        // console.log(temphelpfulRatings);
        //setting the % would recommend value to prop
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
      } else if (!initialPageFilterFlag) {
          var newTemp = [];
          var getStarsArr = [];
          for (let i = 0; i < this.state.currentRatingFilter.length; i++) {
            if (this.state.currentRatingFilter[i] !== 0) {
              getStarsArr.push(i + 1);
            }
          }
          for (let j = 0; j < getStarsArr.length; j++) {
            //getting the new array to work with, filtered
            for (let k = 0; k < temp.length; k++) {
              // console.log(6 - getStarsArr[j])
              if ((6 - getStarsArr[j]) === temp[k].rating) {
                newTemp.push(temp[k]);
              }
            }
          }

          var filteredtempHelpfulness = 0;
          var filteredtempRatings = 0;
          var filteredtempAvg = 0;
          var filteredratingCtr = 0;
          var filteredtemphelpfulRatings = [];
          var actualFilteredRatingCtr = 0;
          for (let i = 0; i < temp.length; i++) {
            filteredratingCtr++;
            filteredtempRatings += temp[i].rating;
            filteredtemphelpfulRatings.push(temp[i].helpfulness)
          }

          filteredtempAvg = filteredtempRatings / filteredratingCtr;
          filteredtempAvg = filteredtempAvg.toFixed(1);

          for (let i = 0; i < newTemp.length; i++) {
            actualFilteredRatingCtr++;
          }
          // console.log('ctr and avg',filteredratingCtr, filteredtempAvg);

          var filteredwouldRecommend = 0;
          for (let i = 0; i < temp.length; i++) {
            if (temp[i].recommend === true) {
              filteredwouldRecommend++;
            }
            filteredtempHelpfulness += temp[i].helpfulness;
          }
          var filteredrecPct = 100 * (filteredwouldRecommend / filteredratingCtr).toFixed(2);

          // console.log('filterred helpfulness would rec and recPct', filteredtempHelpfulness, filteredwouldRecommend, filteredrecPct)

          var filteredtempReviewsArr = [0, 0, 0, 0, 0];
          for (let i = 0; i < newTemp.length; i++) {
            filteredtempReviewsArr[newTemp[i].rating - 1]++
          }
          // console.log(filteredtempReviewsArr);

          var filteredtempDisplayArr = [];
          var filteredtempDisplay = 0
          if (filteredtempReviewsArr.length === 1) {
            filteredtempDisplayArr.push(temp[0]);
            filteredtempDisplay = 1;
          } else {
            filteredtempDisplayArr.push(newTemp[0], newTemp[1]);
            filteredtempDisplay = 2;
          }
          console.log(filteredtempDisplayArr, filteredtempDisplay, filteredtempReviewsArr)

        }

        // console.log(newTemp);
        var tempBarRating = filteredratingCtr;
        if (actualFilteredRatingCtr) {
          filteredratingCtr = actualFilteredRatingCtr
        }
        this.setState({
          reviewData: newTemp || temp,
          ratingAvg: filteredtempAvg || tempAvg,
          barRatings: tempBarRating || ratingCtr,
          totalRatings: filteredratingCtr || ratingCtr,
          wouldRecommend: filteredrecPct || recPct,
          helpfulness: filteredtempHelpfulness || tempHelpfulness,
          reviewsArr: filteredtempReviewsArr || tempReviewsArr,
          displayArr: filteredtempDisplayArr || tempDisplayArr,
          currentlyDisplaying: filteredtempDisplay || tempDisplay,
          helpfulRatings: filteredtemphelpfulRatings || temphelpfulRatings
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

  viewFilters(e) {
    var toggler = !this.state.displayFilters;
    this.setState({ displayFilters: toggler })
  }

  changeRatingFilter(index, newRating) {

    // let currentRevs = this.state.currentRatingFilter;
    // console.log('in main index',index,'\nin main newrating', newRating)
    // currentRevs[index] = newRating;

    let tempRevs = [...this.state.currentRatingFilter];
    tempRevs[index] = newRating;

    this.setState({
      sortType: 'relevant',
      currentRatingFilter: tempRevs
    }, () => { this.getReviewInfo() })
  }

  render() {
    let displayFilters;
    if (this.state.displayFilters === true) {
      displayFilters =
        <div className={ReviewsCSS.show} >
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); this.setState({ sortType: "helpful", displayFilters: false }) }}
          >Helpful</a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); this.setState({ sortType: "newest", displayFilters: false }) }}
          >Newest</a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); this.setState({ sortType: "relevant", displayFilters: false }) }}
          >Relevant</a>
        </div>
    }

    let loadingDiv;
    if (this.state.currentlyDisplaying === 0) {
      loadingDiv =
        <div>
          Reviews are loading...
        </div>
    } else if ((this.state.reviewData.length === 0 || this.state.metaData.length === 0)) {
      loadingDiv =
        <Feed
          reviewData={this.state.reviewData}
          totalRatings={this.state.totalRatings}
        />
    } else {
      loadingDiv =
        <div className={ReviewsCSS.RC_FeedContainer}>
          {/*This div will hold
      the css for the feed
      and star ratings, idealy
      split into a 2:1*/}
          <div >
            <div className={ReviewsCSS.RC_Feed_Flex1}>
              <RatingsCharacteristics
                ratingAvg={Number(this.state.ratingAvg)}
                wouldRecommend={this.state.wouldRecommend}
                reviewsArr={this.state.reviewsArr}
                totalRatings={this.state.barRatings}
                changeRatingFilter={this.changeRatingFilter}
                id={this.props.id}
                filterArr={this.state.currentRatingFilter}
              />
              <p><strong className={ReviewsCSS.characteristicHeader}>About the product:</strong></p>
              <div className={ReviewsCSS.characteristicsContainer}>
                <Characteristics chars={this.state.metaData[0]} />
              </div>
            </div>

          </div>


          <div className={ReviewsCSS.RC_Feed_Flex2}>
            <div className={ReviewsCSS.dropDownFlex}>
              <span>
                <strong>
                  {this.state.totalRatings} reviews, sorted by
                </strong>
                <button
                  onClick={this.viewFilters}
                  className={ReviewsCSS.buttonsA}>{this.state.sortType} &#8595;
                </button>
                <button
                  className={ReviewsCSS.buttonsA}
                  onClick={() => { this.setState({ sortType: 'relevant', }) }}
                  type="button"
                >Reset
                </button>
              </span>
              <div
                className={ReviewsCSS.dropdownContent}
              >
                {displayFilters}
              </div>
            </div>
            <Feed
              reviewData={this.state.reviewData}
              totalRatings={this.state.totalRatings}
              id={this.props.id}
              helpfulRatings={this.state.helpfulRatings}
            />
          </div>
        </div>
    }
    return (
      <div className='scroll-targetRR'>
        {loadingDiv}
      </div>
    )
  }
}

Reviews.propTypes = {
  id: PropTypes.number
}

export default Reviews;

// // //65631, 65632, 65633,65634, 65635