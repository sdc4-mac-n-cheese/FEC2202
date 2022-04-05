import React from 'react';
import Answers from './Answers.jsx';
import ProductCSS from '../cssModules/QA.module.css';
import axios from 'axios';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    }
    this.questionWasHelpful = this.questionWasHelpful.bind(this);
    // this.addAnswer = this.addAnswer.bind(this);
  }

  // addAnswer(event) {

  //   event.preventDefault();
  //   axios.post(`/addAnswer?question_id=${this.props.question.question_id}`, {
  //     product_id: req.body.product_id,
  //     body: req.body.body,
  //     name: req.body.name,
  //     email: req.body.email,
  //     photos: req.body.photos
  //   })
  //   this.props.updateQuestions()
  // }

  questionWasHelpful(event) {

    event.preventDefault();
    console.log('inside help', this.props.question)
    axios.put(`/helpfulQuestion?question_id=${this.props.question.question_id}`)
    .then((response) => {
      this.props.updateQuestions();
    })
    .catch((err) => {
      console.error(err);
    })
  }

  render() {
    console.log('question', this.props.question)
    return (
      <div className={ProductCSS.questions}>
        <span>Q. {this.props.question.question_body}
          <span
          className={ProductCSS.helpfulQuestion}
          onClick={this.questionWasHelpful}
          >
            helpful? yes ({this.props.question.question_helpfulness})
          </span>
          <span
          onClick={this.addAnswer}
          className={ProductCSS.addAnswer}
          >
            Add Answer
          </span>
        </span>
        <div>
          {/* {this.props.question.map(())} */}
          <Answers
            id={this.props.question.question_id}
            answers={this.props.question.answers}
            updateQuestions={this.props.updateQuestions}
          />
        </div>
      </div>
    )
  }
}

export default Question;