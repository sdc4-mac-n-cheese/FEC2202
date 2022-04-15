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
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      '0': false,
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      reviewsArr: this.props.reviewsArr
    })
  }

  handleClick(e) {
    e.preventDefault();

    console.log('props.filterArr[e.target.id]', this.props.filterArr[e.target.id])
    console.log('id', e.target.id);
    if (this.props.filterArr[4 - e.target.id] === 0) {
      console.log('in 0')
      this.setState({
        [e.target.id]: e.target.checked
      },
        () => {
          this.props.changeRatingFilter(4 - e.target.id, 1);
          // this.props.filterArr[4 - e.target.id] = 1
        }
      );
    } else if (this.props.filterArr[4 - e.target.id] === 1) {
      console.log('in 1')
      this.setState({
        [e.target.id]: e.target.checked
      },
        () => {
          this.props.changeRatingFilter(4 - e.target.id, 0);
          // this.props.filterArr[4 - e.target.id] = 0;
        })
    }
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

    var rate = this.props.ratingAvg;
      let starsss = '';
      for (let i = 0; rate > .6; rate -= 1) {
        starsss += '\u2605';
      }
      for (let i = starsss.length; i < 5; i++)
      {
      starsss += '\u2606'
      }

    var appliedFilters = [];
    for (let i = 0; i < this.props.filterArr.length; i++) {
      if (this.props.filterArr[i] === 1) {
        console.log('adding filter', i)
        appliedFilters.push(i);
      }
    }
    var appliedFiltersDisplay;
    if (appliedFilters.length === 0) {
      appliedFiltersDisplay = 'None applied'
    } else if (appliedFilters.length === 5) {
      appliedFiltersDisplay = 'All applied'
    } else {
      appliedFiltersDisplay = 5 - appliedFilters[0]+'\u2605';
      for (let i = 1; i < appliedFilters.length; i++) {
        appliedFiltersDisplay += `, ${5 - appliedFilters[i]+'\u2605'}`;
      }
    }

    let loadingReviews;
    if (this.props.filterArr.length !== 5) {
      loadingReviews =<div>Loading, please wait</div>
    } else {
      loadingReviews =
      <>
        {/*MAPPING BARS TO
          THEIR RATINGS*/}
        <p
          className={ProgressBarCSS.fontType}>
          RATINGS &#38; REVIEWS
        </p>
        <h3>
          {this.props.ratingAvg} {starsss}
        </h3>
        <p>
          {this.props.wouldRecommend.toFixed(0)}&#37; of reviews recommend this product
        </p>

            {/*Div will add outline to the
            ratings box for viewing clarity*/}
        <div
          className={ReviewsCSS.ratingBoxOutline}>
          <p
            className={ProgressBarCSS.filterText}>
            Current Filters: {appliedFiltersDisplay}</p>

          {this.props.reviewsArr.map((item, idx, arr) => (
            <span>
              <input
                id={4 - idx}
                for='checkedbox'
                type="checkbox"
                onClick={this.handleClick}
                checked={this.state[4 - idx]}></input>
              <span
                className={ProgressBarCSS.starAlign}>{stars[idx]}</span>
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
    }
    return (
      <>{loadingReviews}</>
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