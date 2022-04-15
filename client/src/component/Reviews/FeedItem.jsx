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
          var temp = this.props.reviewData.helpfulness + 1;
          this.setState({
            helpfulness: temp,
            helpfulClick: true
          })
        })
        .catch((err) => {
          console.log('error');
        });
    } else {
    }
  }

  putReport() {
    this.setState({
      reportedClick: true
    })
    axios.put('/reviews/report', { review_id:this.props.reviewData.review_id})
      .then((result) => {
      })
      .catch((err) => {
        console.log('error');
      })
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.reviewData.helpfulness = this.state.helpfulness;
    }

  componentDidMount() {
    this.setState({
      helpfulness: this.props.reviewData.helpfulness,
      review_id: this.props.reviewData.review_id
    })
  }

  render() {
    var stars = ''
    for (var i = 0; i < this.props.reviewData.rating; i++) {
      stars += '\u2605'
    }
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
      hasBeenReported = <button className={ReviewsCSS.buttonsA} onClick={this.putReport}>Report</button>
    } else {
      hasBeenReported = `Item Reported`
    }

    let hasBeenHelpful;
    if (this.state.helpfulClick === false) {

      hasBeenHelpful =  <button className={ReviewsCSS.buttonsA} onClick={this.putHelpful} >Helpful({this.state.helpfulness})</button>
    } else {
      hasBeenHelpful = `Thanks for your input!`
    }

    var displayPhotos;
    if (this.props.reviewData.photos.length !== 0) {
      var tempHolder = [];

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
        <li className={ReviewsCSS.feedFont}>
          <p>{this.props.reviewData.reviewer_name}&nbsp;&nbsp;{stars}
          </p>
          <em>{moment(this.props.reviewData.date).format('MMM DD, YYYY')}
          </em><br></br><br></br>
          <p>Purchaser Summary&#58; {this.props.reviewData.summary}</p>
          <p>Purchaser Review&#58; {this.props.reviewData.body}</p>
          {conditionalMerchantResponse}

          <div>
            {displayPhotos}
          </div>
          <div className={ReviewsCSS.og}> {hasBeenHelpful}  {hasBeenReported}
          </div>
        </li>
      )
    }
  }

FeedItem.propTypes = {
  reviewData: PropTypes.object,
}
export default FeedItem;