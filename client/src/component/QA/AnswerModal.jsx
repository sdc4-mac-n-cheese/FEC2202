import React from 'react';
import ProductCSS from '../cssModules/QA.module.css';
import axios from 'axios';
import PropTypes from 'prop-types'

const OVERLAY_STYLES = {

  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

const MODAL_STYLES = {

  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  borderRadius: '20px',
  zIndex: 1000
}

const ANSWER_STYLE = {

  width: '300px',
  height: '110px',
}

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      body: '',
      name: '',
      email: '',
      photos: [],
      pictureCount: 0
    }

    this.postAnswer = this.postAnswer.bind(this);
    this.handleBody = this.handleBody.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePics = this.handlePics.bind(this);
  }

  handlePics(file) {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'uzuaxqcc');

    if (this.state.photos.length === 5) {

      alert('You already uploaded 5 images')
    } else {

      axios.post('https://api.cloudinary.com/v1_1/atelier-lannister/image/upload', formData)
        .then((response) => {
          if (this.state.photos.length === 4) {

            this.setState({
              photos: this.state.photos.concat(response.data.url),
              pictureCount: 'Max uploaded'
            })
          } else {

            this.setState({
              photos: this.state.photos.concat(response.data.url),
              pictureCount: this.state.pictureCount + 1
            })
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  handleBody() {
    this.setState({ body: event.target.value })
  }
  handleName() {
    this.setState({ name: event.target.value })
  }
  handleEmail() {
    this.setState({ email: event.target.value })
  }

  postAnswer(event) {

    event.preventDefault();

    axios.post(`/addAnswer?question_id=${this.props.question.question_id}`, {
      body: this.state.body,
      name: this.state.name,
      email: this.state.email,
      photos: this.state.photos
    })
      .then(() => {
        this.props.updateQuestions();
        this.props.onClose();
      })
      .catch((err) => {
        alert(
          'You must enter the following: \n\n Name: Must be between 1-60 characters \n Example email: fakeEmail@gmail.com \n Photos: No more than 5 photos \n Answer: Must be between 1-1000 characters'
        )
        console.error(err);
      })
  }

  render() {

    if (!this.props.open) return null;
    return (

      <>
        <div />
        <div style={OVERLAY_STYLES} >
          <form style={MODAL_STYLES}>
            <span className={ProductCSS.exit}
              onClick={this.props.onClose}>
              {<i className="fa fa-times fa-2x" aria-hidden="true"></i>}
            </span>

            <input
              type='text'
              placeholder='Your nickname *'
              onChange={this.handleName}
              className={ProductCSS.formInput}
            />

            <input
              type='text'
              placeholder='Your email *'
              onChange={this.handleEmail}
              className={ProductCSS.formInput}
            />

            <input
              type='file'
              onChange={(event) => this.handlePics(event.target.files[0])}
              className={ProductCSS.formInput}
            />

            <span className={ProductCSS.photoCount}>Photos uploaded: {this.state.pictureCount}</span>

            <textarea
              style={ANSWER_STYLE}
              type='text'
              placeholder='Your answer *'
              onChange={this.handleBody}
              className={ProductCSS.formInput}
            />
            <span
              onClick={this.postAnswer}
              className={ProductCSS.close}>
              Submit Answer
            </span>
          </form>
        </div>
      </>
    )
  }
}

AnswerModal.propTypes = {

  onClose: PropTypes.func,
  updateQuestions: PropTypes.func,
  currentProduct: PropTypes.number,
  open: PropTypes.func,
  question: PropTypes.object
}

export default AnswerModal;