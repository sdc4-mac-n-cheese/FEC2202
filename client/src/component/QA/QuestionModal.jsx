import React from 'react';
import ProductCSS from '../cssModules/QA.module.css';
import axios from 'axios';
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
  padding:'50px',
  borderRadius: '20px',
  zIndex: 1000
}

const QUESTION_STYLE = {

  width: '300px',
  height: '110px',
}

class QuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      body: '',
      name: '',
      email: ''
      // photos: []
    }

    this.postQuestion = this.postQuestion.bind(this);
    this.handleBody = this.handleBody.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.newQuestions = this.newQuestions.bind(this);
    // this.handlePhotos = this.handleBody.bind(this);
  }

  newQuestions(questions) {

    this.props.newQuestions();
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
  // handlePhotos() {
  //   this.setState({ photos: [event.target.value] })
  // }

  postQuestion(event) {

    // let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp'
    event.preventDefault();
    // if (this.state.body.length < 1 || this.state.body.length > 1000) {
    //   alert('')
    // } else if (this.state.name.length < 1 || this.state.name.length > 60) {
    //   alert('')
    // } else if (this.state.email) {
    //   alert('')
    // }

    axios.post('/addQuestion', {
      body: this.state.body,
      name: this.state.name,
      email: this.state.email,
      product_id: this.props.currentProduct
    })
      .then(() => {
        this.props.updateQuestions();
        this.props.onClose();
        // alert('question posted!')
      })
      .catch((err) => {
        // console.log('ORRR HERE', this.props.question)
        alert('You must enter the following: \n\n Name: Must be between 1-60 characters \n Example email: fakeEmail@gmail.com \n Question: must be between 1-1000 characters')
        console.error(err);
      })
  }

  render() {

    if (!this.props.open) return null;
    return (

      <>
        <div />
        <div style={OVERLAY_STYLES}>
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
            <textarea
            style={QUESTION_STYLE}
            type='text'
            placeholder='Your question *'
            onChange={this.handleBody}
            className={ProductCSS.formInput}
            />

          <button onClick={this.postQuestion} className={ProductCSS.close}>
            Submit Question
          </button>
          </form>
          {this.props.children}
        </div>
      </>
    )
  }
}



export default QuestionModal;