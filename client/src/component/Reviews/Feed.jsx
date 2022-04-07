import React from 'react';
import FeedItem from './FeedItem.jsx';
// import RatingsCharacteristics from './RatingsCharacteristics.jsx';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // componentDidMount() {
  //   //get first 2 ReviewFeed
  //   //render out the comment
  //   //
  // }

  render() {
    if (this.props.ratings === 0) {
      return (
        <div><br></br>This item has no reviews!<br></br>
          <strong>Be the first to leave a review!</strong><br></br>
          <button>Leave a Review!</button>
        </div>
      )
    } else {
      return (

        <div>
           {/* <button >More Reviews</button>
          <button>Leave a Review!</button> */}
          <div>Total Ratings: {this.props.totalRatings}</div>
             <ul>
            {this.props.reviewData.map((data, i) => (
              <FeedItem
                reviewData={data}
                key={i}
              />
            ))}
             </ul>
           </div>
      )
    }
  }
}

export default Feed;