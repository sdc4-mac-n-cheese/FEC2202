import React from 'react';
import FeedItem from './FeedItem.jsx';
import ReviewsCSS from "../cssModules/Reviews/Reviews.module.css";
import PropTypes from 'prop-types';
import Modal from './Modal.jsx';
import FeedCSS from '../cssModules/Reviews/Feed.module.css';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewCtr: 0,
      show: false
    };

    this.getTwoMore = this.getTwoMore.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    if (this.props.totalRatings === 1) {
      this.setState({ reviewCtr: 1 });
    } else {
      this.setState({ reviewCtr: 2 });
    }
  }


  getTwoMore() {
    var tempCtr = this.state.reviewCtr + 2;
    this.setState({reviewCtr: tempCtr})
  }

  showModal(e) {
    this.setState({ show: !this.state.show });
  }

  render() {

    //Hides the more reviews button when all are currently displayed
    let hideMoreReviewsButton;
    if (this.state.reviewCtr >= this.props.totalRatings) {
      hideMoreReviewsButton = <></>
    } else {
      hideMoreReviewsButton = <button
      className={ReviewsCSS.moreReviews}
      onClick={this.getTwoMore}
    >More Reviews</button>
    }

    //Loads empty reviews section, allows user to add a first comment
    if (this.props.totalRatings === 0) {
      return (
        <div>This item has no reviews!
          <strong>Be the first to leave a review!</strong>
          <button
            onClick={(e) => { this.showModal(); }}
          >Leave a Review!
          </button>
          <Modal
            show={this.state.show}
            onClose={this.showModal}
          >Message in Modal
          </Modal>
        </div>
      )
    } else {
      return (
        <div className={FeedCSS.feedBox}>
          <div className={FeedCSS.reviewScroller}>
            <ul>
              {this.props.reviewData.slice(0, this.state.reviewCtr).map((data, i) => (
                <FeedItem
                  reviewData={data}
                  key={i}
                />
              ))}
            </ul>
          </div>
          {hideMoreReviewsButton}
          <button
            onClick={(e) => { this.showModal(); }}
          >Leave a review
          </button>
          <Modal
            show={this.state.show}
            onClose={this.showModal}
            id={this.props.id}
          >
            Message in Modal
          </Modal>
        </div>
      )
    }
  }
}

Feed.propTypes = {
  totalRatings: PropTypes.number,
  reviewData: PropTypes.array,
  id: PropTypes.number
}

export default Feed;