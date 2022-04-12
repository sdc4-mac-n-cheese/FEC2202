import React from 'react';
import ProductCSS from '../cssModules/QA.module.css';
import axios from 'axios';
// import
// require('dotenv').config();

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

const ICON_STYLES = {

  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

const ANSWER_STYLE = {

  width: '300px',
  height: '110px',
}

// const modal = {
//   // display: none,
//   position: fixed,
//   zindex: 1,
//   left: 0,
//   top: 0,
//   // width: 100%,
//   // height: 100%,
//   // overflow: auto,
//   // backgroundColor: rgb(0,0,0),
//   backgroundColor: 'rgba(0,0,0, .7)',
// }

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      body: '',
      name: '',
      email: '',
      photos: []
    }

    this.postAnswer = this.postAnswer.bind(this);
    this.handleBody = this.handleBody.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhotos = this.handleBody.bind(this);
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
  handlePhotos() {
    this.setState({ photos: [event.target.value] })
  }

  postAnswer(event) {

    // let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp'
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
        // alert('answer posted!')
      })
      .catch((err) => {

        alert('You must enter the following: \n\n Name: Must be between 1-60 characters \n Example email: fakeEmail@gmail.com \n Photos: No more than 5 photos \n Answer: Must be between 1-1000 characters')
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
            <span className={ProductCSS.exit} onClick={this.props.onClose}>X</span>

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
              type='text'
              placeholder='Upload photos'
              onChange={this.handlePhotos}
              className={ProductCSS.formInput}
            />

            <textarea
              style={ANSWER_STYLE}
              type='text'
              placeholder='Your answer *'
              onChange={this.handleBody}
              className={ProductCSS.formInput}
            />
            <button onClick={this.postAnswer} className={ProductCSS.close}>
              Submit Answer
            </button>
          </form>
          {this.props.children}
        </div>
      </>
    )
  }
}



export default AnswerModal;