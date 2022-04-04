import React from 'react';
import FeedItem from './FeedItem.jsx';
import RatingsCharacteristics from './RatingsCharacteristics.jsx';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    //get first 2 ReviewFeed
    //render out the comment
    //
  }

  render() {
    if (this.props.ratings === 0) {
      return (
        <div><br></br>This item has no reviews!<br></br>
          <strong>Be the first to leave a review!</strong><br></br>
          <button>Leave a review</button>
        </div>
      )
    }
    return (
      <div>
        <div>In Feed</div>
        <button >More Reviews</button>      <button align="right">Leave a Review!</button>
        <br></br><div>Total Ratings: {this.props.ratings}</div><br></br>
        <RatingsCharacteristics ratingAvg={this.props.ratingAvg} wouldRecommend={this.props.wouldRecommend}/>
        <ul>
          {this.props.data.map((data, i) => (
            <FeedItem
              data={data}
              key={i}
            />
          ))}
        </ul>
        {/* <button align="right">More Reviews</button>      <button align="right">Leave a Review!</button> */}

      </div>
    )
  }
}

export default Feed;