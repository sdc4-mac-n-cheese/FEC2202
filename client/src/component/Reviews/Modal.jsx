import React from 'react';
import PropTypes from 'prop-types';
import ModalCSS from '../cssModules/Reviews/Modal.module.css';
import ReviewsCSS from '../cssModules/Reviews/Reviews.module.css';
import axios from 'axios';

const SUMMARY_LIMITER = 60;
var SUMMARY_FLAG = true;
const USERNAME_LIMITER = 60;
var USERNAME_FLAG = true;
const EMAIL_LIMITER = 60;
var EMAIL_FLAG = true;
const BODY_MIN = 50;
const BODY_MAX = 1000;
var BODY_FLAG = true;
const PHOTO_LIMITER = 5;

const reviewRating = ['Poor', 'Fair', 'Average', 'Good', 'Great']

class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      recommend: null,
      hover: 1,
      'size': 0,
      'width': 0,
      'comfort': 0,
      'quality': 0,
      'length': 0,
      'fit': 0,
      charArr: ['size', 'width', 'comfort', 'quality', 'length', 'fit'],
      summary: '',
      body: '',
      im1: '',
      img2: '',
      img3: '',
      img4: '',
      img5: '',
      photos: [],
      username: '',
      email: ''
    }
    this.onClose = this.onClose.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onClose(e) {
    console.log('in on close modal');
    this.props.onClose && this.props.onClose(e);
  }

  handleSummaryChange(e) {
    if (this.state.summary.length < SUMMARY_LIMITER) {
      this.setState({
        summary: e.target.value,
      }, () => { console.log(this.state.summary); });
    } else {

      this.setState({
        summary: e.target.value,
      }, () => { console.log(this.state.summary); });
    }
  }

  handleBodyChange(e) {
    if (this.state.body.length < BODY_MAX) {
      this.setState({
        body: e.target.value
      }, () => { console.log(this.state.body); });
    } else {

      this.setState({
        body: e.target.value
      }, () => { console.log(this.state.body); });
    }
  }

  handleImgChange(e) {
    // console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleUsernameChange(e) {
    if (this.state.username.length < USERNAME_LIMITER) {
      this.setState({
        username: e.target.value,
      }, () => { console.log(this.state.username); });
    } else {

      this.setState({
        username: e.target.value,
      }, () => { console.log(this.state.username); });
    }
  }

  handleEmailChange(e) {
    if (this.state.email.length < EMAIL_LIMITER) {
      this.setState({
        email: e.target.value,
      }, () => { console.log(this.state.email); });
    } else {

      this.setState({
        email: e.target.value,
      }, () => { console.log(this.state.email); });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('in handle submit!');
    console.log(this.state.photos);
    //ERROR FIRST HANDLER OF POST REQUEST...
    //CRITERIA NOT MET,
    //MUST SATISFY ALL FLAGS
    if (SUMMARY_FLAG || USERNAME_FLAG || EMAIL_FLAG || BODY_FLAG || this.state.recommend === null) {
      console.log('please fill out form apporpriately');
      console.log(this.props.id)
      return;
    } else {
      //AXIOS POST REQUEST HERE WITH OBJECT CREATION

      // console.log(this.state.img1, this.state.img2, this.state.img3, this.state.img4, this.state.img5);
      var tempPhotos = [];
      if (this.state.img1.includes(".jpg") || this.state.img1.includes(".jpeg")) {
        tempPhotos.push(this.state.img1);
      }
      if (this.state.img2.includes(".jpg") || this.state.img2.includes(".jpeg")) {
        tempPhotos.push(this.state.img2);
      }
      if (this.state.img3.includes(".jpg") || this.state.img3.includes(".jpeg")) {
        tempPhotos.push(this.state.img3);
      }
      if (this.state.img4.includes(".jpg") || this.state.img4.includes(".jpeg")) {
        tempPhotos.push(this.state.img4);
      }
      if (this.state.img5.includes(".jpg") || this.state.img5.includes(".jpeg")) {
        tempPhotos.push(this.state.img5);
      }
      console.log(tempPhotos);
      var postBodyParams = {
        product_id: this.props.id,
        rating: this.state.rating,
        summary: this.state.summary,
        body: this.state.body,
        recommend: this.state.recommend,
        name: this.state.username,
        email: this.state.email,
        photos: tempPhotos,
        characteristics: {
          "14": this.state['size'],
          "15": this.state['width'],
          "16": this.state['comfort'],
          "17": this.state['quality'],
          "18": this.state['length'],
          "19": this.state['fit']
        }
      };
      console.log()

      axios({
        method: 'post',
        url: '/reviews',
        data: postBodyParams
      })
        .then((result) => {
          console.log('we made it boys');
          this.onClose()
        })
        .catch((err) => {
          console.log('oh, you thought...');
          this.onClose();
      })
      // console.log(postBodyParams);
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    let summaryLimitWarning = <></>;
    //if summary flag is true, prevent submission, with message
    if (this.state.summary.length > SUMMARY_LIMITER) {
      summaryLimitWarning = <span><i>Please make character limit less than: {SUMMARY_LIMITER}, over by {this.state.summary.length - SUMMARY_LIMITER}</i></span>
      SUMMARY_FLAG = true;
    } else {
      SUMMARY_FLAG = false;
    }

    let bodyLimitWarning = <></>;
    //if body flag is true, prevent submission, with message
    if (this.state.body.length < BODY_MIN) {
      bodyLimitWarning = <span><i>Minimum of {BODY_MIN} characters required, short by {BODY_MIN - this.state.body.length}</i></span>
      BODY_FLAG = true;
    } else if (this.state.body.length > BODY_MAX) {
      bodyLimitWarning = <span><i>Maximum of {BODY_MAX} characters reached, over by {this.state.body.length - BODY_MAX}</i></span>
      BODY_FLAG = true;
    } else {
      BODY_FLAG = false;
    }

    let usernameLimitWarning = <></>;
    //if summary flag is true, prevent submission, with message
    if (this.state.username.length > USERNAME_LIMITER) {
      usernameLimitWarning = <span><i>Please make character limit less than: {USERNAME_LIMITER}, over by {this.state.username.length - USERNAME_LIMITER}</i></span>
      USERNAME_FLAG = true;
    } else {
      USERNAME_FLAG = false;
    }

    let emailLimitWarning = <></>;
    //if summary flag is true, prevent submission, with message
    if (this.state.email.length > EMAIL_LIMITER) {
      emailLimitWarning = <span><i>Please make character limit less than: {EMAIL_LIMITER}, over by {this.state.email.length - EMAIL_LIMITER}</i></span>
      EMAIL_FLAG = true;
    } else {
      EMAIL_FLAG = false;
    }



    return(
      <div className={ModalCSS.modalForm}>
        <div>{this.props.children}</div>

        {/*START OF FORM
        TO POST NEW REVIEW
        */}
        <form onSubmit={this.handleSubmit}>
          <p>
            Leave a review for the item&#58;
          </p>

          {/*STAR REVIEW CHART*/}
          <p>
            I rate this product&#58;
          </p>
          <div className={ModalCSS.starRating}>
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= this.state.rating ? ModalCSS.on : ModalCSS.off}
                  onClick={() => { this.setState({ rating: index }) }}
                  onMouseEnter={() => { this.setState({hover: index})}}
                  onMouseLeave={() => { this.setState({hover: this.state.rating})}}
                >
                <span className="star">&#9733;</span>
                </button>
              );
            })}{reviewRating[this.state.rating - 1]}
          </div>

          {/*PRODUCT RECOMENDATION
          ALLOWS USER TO ENTER A BOOLEAN
          DEFAULT IT NULL*/}
          <div>
            <label><p>
              Recommend this item:
              </p></label>
            <button
              type="button"
              onClick={() => { this.setState({ recommend: true }) }}
            >&#128077;</button>
            <button
              type="button"
              onClick={() => { this.setState({ recommend: false }) }}
            >&#128078;</button>
          </div>

          {/*CHARACTERISTICS INPUT TABLE*/}
          <div>
            {this.state.charArr.map((characteristic, index) => {
              return (
                <p
                  key={index}
                >{characteristic}&#58;
                  <button
                    type="button"
                    className={index <= this.state[characteristic] ? ModalCSS.on : ModalCSS.off}
                    onClick={() => { this.setState({ [this.state.charArr[index]]: 1 }) }}
                  >1</button>

                  <button
                    type="button"
                    className={index <= this.state[characteristic] ? ModalCSS.on : ModalCSS.off}
                    onClick={() => { this.setState({ [this.state.charArr[index]]: 2 }) }}
                  >2</button>

                  <button
                    type="button"
                    className={index <= this.state[characteristic] ? ModalCSS.on : ModalCSS.off}
                    onClick={() => { this.setState({ [this.state.charArr[index]]: 3 }) }}
                  >3</button>

                  <button
                    type="button"
                    className={index <= this.state[characteristic] ? ModalCSS.on : ModalCSS.off}
                    onClick={() => { this.setState({ [this.state.charArr[index]]: 4 }) }}
                  >4</button>

                  <button
                    type="button"
                    className={index <= this.state[characteristic] ? ModalCSS.on : ModalCSS.off}
                    onClick={() => { this.setState({ [this.state.charArr[index]]: 5 }) }}
                  >5</button>
                </p>
              )

            })}
          </div>


          {/*REVIEW SUMMARY
             60 CHARACTER LIMIT
          */}
          <div>
            <label><p>
              Review Summary&#58;
              </p></label>
            <textarea
              type="text"
              placeholder="leave a summary..."
              value={this.state.summary}
              onChange={this.handleSummaryChange}
            ></textarea>
            {summaryLimitWarning}
          </div>


          {/*REVIEW BODY
            50 CHAR MINIMUM
            1000 CHAR MAXIMUM
            USER MAY UPLOAD 5 PHOTOS
          */}
          <div>
            <label><p>
              Review Body&#58;
              </p></label>
            <textarea
              type="text"
              placeholder="review the product..."
              value={this.state.body}
              onChange={this.handleBodyChange}
              rows="10"
              cols="40"
            ></textarea>
            {bodyLimitWarning}
          </div>

          {/*ADD A PHOTO DIV HERE
          TO ALLOW USER TO UPLOAD
          UP TO 5 PICTURES
          */}
          <div>
              Upload photo &#40;s&#41;&#58;
            <input
              type="text"
              name="img1"
              onChange={this.handleImgChange}
              />
              Upload photo &#40;s&#41;&#58;
            <input
              type="text"
              name="img2"
              onChange={this.handleImgChange}
              />
              Upload photo &#40;s&#41;&#58;
            <input
              type="text"
              name="img3"
              onChange={this.handleImgChange}
              />
              Upload photo &#40;s&#41;&#58;
            <input
              type="text"
              name="img4"
              onChange={this.handleImgChange}
              />
              Upload photo &#40;s&#41;&#58;
            <input
              type="text"
              name="img5"
              onChange={this.handleImgChange}
              />
          </div>


          {/*USER NICKNAME
          60 CHARACTER LIMIT*/}
          <div>
            <label>
               Username&#58;
            </label>
            <input
              type="text"
              placeholder="username here..."
              value={this.state.username}
              onChange={this.handleUsernameChange}
            ></input>
            {usernameLimitWarning}
          </div>

          {/*USER EMAIL
          60 CHARACTER LIMIT
          MUST CONTAIN '@'
          */}
          <div>
            <label>
               e-mail&#58;
            </label>
            <input
              type="email"
              placeholder="email here..."
              value={this.state.email}
              onChange={this.handleEmailChange}
            ></input>
            {emailLimitWarning}
            <p><i>For authentication reasons, you will not be e-mailed</i></p>
          </div>


          {/*SUBMIT BUTTON*/}
          <div>
            <button
              className={ReviewsCSS.buttonsA}
              onClick={(e) => { this.onClose(e); }}
              >
              Close
            </button>
            <button
              className={ReviewsCSS.buttonsA}>Submit review
            </button>
          </div>

          {/*END OF MODAL FORM*/}
        </form>
      </div>
    )
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number
}
export default Modal;