import React from 'react';
import ProductCSS from '../cssModules/QA.module.css';
import axios from 'axios';

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
    this.setState({ body : event.target.value })
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

  postAnswer() {

    axios.post(`/addAnswer?question_id=${this.props.question.question_id}`, {
      body: this.state.body,
      name: this.state.name,
      email: this.state.email,
      photos: this.state.photos
    })
    .then(() => {
      this.props.updateQuestions();
      alert('answer posted!')
    })
    .catch((err) => {
      console.log('ORRR HERE', this.props.question)
      console.error(err);
    })
  }

  render() {

    if(!this.props.open) return null;
    return (

      <>
      <div className={ProductCSS.OVERLAY_STYLES}/>
    <div className={ProductCSS.MODAL_STYLES}>
      <form>
        <input type='text' placeholder='your answer here' onChange={this.handleBody}/>
        <input type='text' placeholder='your name here' onChange={this.handleName}/>
        <input type='text' placeholder='your email here' onChange={this.handleEmail}/>
        <input type='text' placeholder='your photos here' onChange={this.handlePhotos}/>

      </form>
      <a onClick={this.props.onClose}>
        Close
      </a>
      <a onClick={this.postAnswer}>
        Submit Answer
      </a>
      { this.props.children }
    </div>
      </>
    )
  }
}



export default AnswerModal;