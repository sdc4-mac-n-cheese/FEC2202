import React from 'react';

class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
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
    }
    return (
      <div>
        <li>
          {stars} {this.props.reviewData.reviewer_name}  {this.props.reviewData.date} <br></br>
        Purchaser Summary: {this.props.reviewData.summary}<br></br>
        Purchaser Review: {this.props.reviewData.body}<br></br>
        {conditionalMerchantResponse}
          Helpful? <button>YES</button> {this.props.reviewData.helpfulness}| <button>Report</button> <br></br><br></br><br></br>
          </li>
      </div>
    )
  }
}

export default FeedItem;