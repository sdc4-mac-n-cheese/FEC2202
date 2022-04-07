import React from 'react';
import ReviewsCSS from '../cssModules/Reviews.module.css';
import axios from 'axios';
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
      console.log('already clicked helpful this visit');
    }
  }

  putReport() {
    console.log('in put report func');
    this.setState({
      reportedClick: true
    })
    axios.put('/reviews/report', { review_id:this.props.reviewData.review_id})
      .then((result) => {
        console.log('success');
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
    var stars = '';
    for (var i = 0; i < this.props.reviewData.rating; i++) {
      stars += '*';
    }

    let conditionalMerchantResponse = <></>
    if (this.props.reviewData.response !== null && this.props.reviewData.response !== '') {
      conditionalMerchantResponse = <div>Merchant Response: {this.props.reviewData.response}<br></br></div>
    } else {
      conditionalMerchantResponse = <br></br>
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

    return (

        <li>
          {stars} {this.props.reviewData.reviewer_name}  {this.props.reviewData.date}
        Purchaser Summary: {this.props.reviewData.summary}
        Purchaser Review: {this.props.reviewData.body}
          {conditionalMerchantResponse}
        <div className={ReviewsCSS.og}> {hasBeenHelpful} | {hasBeenReported}
</div>
          </li>

    )
  }
}

export default FeedItem;