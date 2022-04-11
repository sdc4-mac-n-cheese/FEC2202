import React from 'react';
import ReviewsCSS from '../cssModules/Reviews/Reviews.module.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';

class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: 0,
      review_id: 0,
      reportedClick: false,
      helpfulClick: false
    };
    this.putHelpful = this.putHelpful.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.putReport = this.putReport.bind(this);
  }

  //updating, not live...set state to try and update
  putHelpful() {
    if (this.state.helpfulClick === false) {
      axios.put(`/reviews/helpful`, { review_id: this.props.reviewData.review_id })
        .then((result) => {
          // console.log('great success')
          var temp = this.props.reviewData.helpfulness + 1;
          // console.log('in axios put', temp);
          this.setState({
            helpfulness: temp,
            helpfulClick: true
          })
        })
        .catch((err) => {
          console.log('error');
        });
    } else {
      // console.log('already clicked helpful this visit');
    }
  }

  putReport() {
    // console.log('in put report func');
    this.setState({
      reportedClick: true
    })
    axios.put('/reviews/report', { review_id:this.props.reviewData.review_id})
      .then((result) => {
        // console.log('success');
      })
      .catch((err) => {
        console.log('error');
      })
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('PS:', prevState.helpfulness, '\nCS:', this.state.helpfulness, '\nPP:', prevProps.reviewData.helpfulness);
    this.props.reviewData.helpfulness = this.state.helpfulness;
    }

  componentDidMount() {
    // console.log('in mount;',this.props.reviewData.helpfulness)
    this.setState({
      helpfulness: this.props.reviewData.helpfulness,
      review_id: this.props.reviewData.review_id
    })
  }


  //reviewData brings in:
  //body, date, helfulness, photos, rating,
  //recommended, response, review_id, reviewer_name,
  //summary
  render() {
    var stars = ''
    //sets full stars
    for (var i = 0; i < this.props.reviewData.rating; i++) {
      stars += '\u2605'
    }
    //if less than 5*, this will populate the rest with hollow stars
    while (stars.length < 5) {
      stars += '\u2606'
    }

    let conditionalMerchantResponse = <></>
    if (this.props.reviewData.response !== null && this.props.reviewData.response !== '') {
      conditionalMerchantResponse = <p>Merchant Response: {this.props.reviewData.response}</p>
    } else {
      conditionalMerchantResponse = <></>
    }

    let hasBeenReported;
    if (this.state.reportedClick === false) {
      hasBeenReported = <button className={ReviewsCSS.buttons} onClick={this.putReport}>Report</button>
    } else {
      hasBeenReported = `Item Reported`
    }

    let hasBeenHelpful;
    if (this.state.helpfulClick === false) {
      hasBeenHelpful =  <button onClick={this.putHelpful} >Helpful({this.state.helpfulness})</button>
    } else {
      hasBeenHelpful = `Thanks for your input!`
    }

    var displayPhotos;
    if (this.props.reviewData.photos.length !== 0) {
      var tempHolder = [];

        // <img
        //   className={ReviewsCSS.reviewImages}
        //   alt="item review photo"
        //   src={this.props.reviewData.photos[0].url}
        // />;
      for (let i = 0; i < this.props.reviewData.photos.length; i++) {
        tempHolder.push(
          <img
          className={ReviewsCSS.reviewImages}
          alt="item review photo"
          src={this.props.reviewData.photos[i].url}
        />)
      }
      displayPhotos = tempHolder;
    }
    if (displayPhotos) {
      // console.log(displayPhotos.length);
    }

    return (
      <li>
        <p>{stars} {this.props.reviewData.reviewer_name}
          <span>{moment(this.props.reviewData.date).format('MMM DD, YYYY')}
          </span>
        </p>
        <p>Purchaser Summary: {this.props.reviewData.summary}</p>
        <p>Purchaser Review: {this.props.reviewData.body}</p>
        {conditionalMerchantResponse}


        {/*Spce for photos and css for it*/}
        <div>
            {displayPhotos}
        </div>
        <div className={ReviewsCSS.og}> {hasBeenHelpful} | {hasBeenReported}
        </div>
      </li>

    )
  }
}

FeedItem.propTypes = {
  reviewData: PropTypes.object,
}
export default FeedItem;