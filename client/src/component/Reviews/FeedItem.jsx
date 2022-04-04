import React from 'react';

class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //get first 2 ReviewFeedItem
    //render out the comment

    //
  }


  //data brings in:
  //body, date, helfulness, photos, rating,
  //recommended, response, review_id, reviewer_name,
  //summary
  render() {
    var stars = '';
    for (var i = 0; i < this.props.data.rating; i++) {
      stars += '*';
    }

    let conditionalMerchantResponse = <></>
    if (this.props.data.response !== null && this.props.data.response !== '') {
      conditionalMerchantResponse = <div>Merchant Response: {this.props.data.response}<br></br></div>
    }
    return (
      <div>
        <li>
          {stars} {this.props.data.reviewer_name}  {this.props.data.date} <br></br>
        Purchaser Summary: {this.props.data.summary}<br></br>
        Purchaser Review: {this.props.data.body}<br></br>
        {conditionalMerchantResponse}
          Helpful? <button>YES</button> {this.props.data.helfulness} | <button>Report</button> <br></br><br></br><br></br>
          </li>
      </div>
    )
  }
}

export default FeedItem;