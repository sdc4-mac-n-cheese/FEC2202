import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar.jsx';
import ReviewsCSS from "../cssModules/Reviews/Reviews.module.css";
import ProgressBarCSS from '../cssModules/Reviews/ProgressBar.module.css';

class RatingsCharacteristics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsArr: [],
      reviews: 0,
      mostVotes: 0,
    };
    this.getReviews = this.getReviews.bind(this);
  }

  componentDidMount() {
    this.setState({
      reviewsArr: this.props.reviewsArr.reverse()},
      () => { this.getReviews() });
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
    var stars = [
      '\u2605\u2605\u2605\u2605\u2605',
      '\u2605\u2605\u2605\u2605',
      '\u2605\u2605\u2605',
      '\u2605\u2605',
      '\u2605'
    ];

    {/*CALUCULATING FOR STARS TO SHOW
      UP NEXT TO THE RATING NUMBER*/}

    let rate = this.props.ratingAvg;
      let starsss = '';
      for (let i = 0; rate > .8; rate -= 1) {
        starsss += '\u2605';
      }
    // if (rate < .75 || rate > .25) {
    //   starsss += `\u2BE8`;
    //   }
    // console.log('star',starsss);
    return (
      <>
      {/*MAPPING BARS TO
         THEIR RATINGS*/}
          <p>RATINGS &#38; REVIEWS</p>
        <h3>{this.props.ratingAvg} {starsss}</h3>
          <p>{this.props.wouldRecommend.toFixed(0)}&#37; of reviews recommend this product</p>

          {/*Div will add outline to the
          ratings box for viewing clarity*/}
      <div className={ReviewsCSS.ratingBoxOutline}>
        {this.state.reviewsArr.map((item, idx) => (
          <span>
            <span className={ProgressBarCSS.starAlign}>{stars[idx]}</span>
            <ProgressBar
              stars={5-idx}
              bgcolor="#50C878"
              completed={(item / this.props.totalRatings * 100).toFixed(0)}
            />
          </span>
        ))}
      </div>
    </>
    )
  }
}

RatingsCharacteristics.propTypes = {
  ratingAvg: PropTypes.number,
  reviewsArr: PropTypes.array,
  wouldRecommend: PropTypes.number,
  totalRatings: PropTypes.number
}

export default RatingsCharacteristics;