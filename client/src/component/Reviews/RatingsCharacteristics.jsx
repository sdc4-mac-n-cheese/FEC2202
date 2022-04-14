import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar.jsx';
import ReviewsCSS from "../cssModules/Reviews/Reviews.module.css";
import ProgressBarCSS from '../cssModules/Reviews/ProgressBar.module.css';

class RatingsCharacteristics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // this.getReviews = this.getReviews.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.setState({
      reviewsArr: this.props.reviewsArr})
      // () => { this.getReviews() });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.id !== prevProps.id) {
  //     console.log('the props are not equal')
  //     this.componentDidMount();
  //   }
  // }

  // getReviews() {
  //   var tempReviews = 0;
  //   for (let i = 0; i < this.props.reviewsArr.length; i++) {
  //     tempReviews += (this.props.reviewsArr[i]);
  //   }
  //   // console.log(tempReviews);
  //   this.setState({
  //     reviews: tempReviews

  //   })
  // }
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
      for (let i = 0; rate > .6; rate -= 1) {
        starsss += '\u2605';
      }
      for (let i = starsss.length; i < 5; i++)
      {
      starsss += '\u2606'
      }

    return (
      <>
      {/*MAPPING BARS TO
         THEIR RATINGS*/}
          <p className={ProgressBarCSS.fontType}>RATINGS &#38; REVIEWS</p>
        <h3>{this.props.ratingAvg} {starsss}</h3>
          <p>{this.props.wouldRecommend.toFixed(0)}&#37; of reviews recommend this product</p>

          {/*Div will add outline to the
          ratings box for viewing clarity*/}
      <div className={ReviewsCSS.ratingBoxOutline}>
        {this.props.reviewsArr.map((item, idx, arr) => (
          <span>
            <span className={ProgressBarCSS.starAlign}>{stars[idx]}</span>
            <ProgressBar
              stars={5 - idx}
              bgcolor="#525252"
              completed={(arr[4 - idx] / this.props.totalRatings * 100).toFixed(0)}
              changeRatingFilter={this.props.changeRatingFilter}
              filterArr={this.props.filterArr[idx]}
              starIndex={idx}
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