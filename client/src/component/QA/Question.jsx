import React from 'react';
import Answers from './Answers.jsx';
import ProductCSS from '../cssModules/QA.module.css';
import axios from 'axios';
import AnswerModal from './AnswerModal.jsx';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      // currentProduct: this.props.currentProduct,
      // question: this.props.question
      isOpen: false,
      count: 2
    }
    this.questionWasHelpful = this.questionWasHelpful.bind(this);
    this.openAnswerModal = this.openAnswerModal.bind(this);
    this.showMore = this.showMore.bind(this);
    this.collapse = this.collapse.bind(this);
  }

  collapse() {

    this.setState({ count: 2 })
  }

  showMore() {

    this.setState({ count: this.state.count + 2 })
  }

  openAnswerModal(bool) {

    this.setState({ isOpen: bool })
  }

  // closeAnswerModal() {

  //   this.setState({ isOpen: false })
  // }

  questionWasHelpful(event) {

    event.preventDefault();
    // console.log('inside help', this.props.question)
    axios.put(`/helpfulQuestion?question_id=${this.props.question.question_id}`)
      .then(() => {
        this.props.updateQuestions()
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    // console.log('in render question', this.state.question)

    return (
      <div className={ProductCSS.questions}>
        <span>Q. {this.props.question.question_body}
          <a
          className={ProductCSS.addAnswer}
          onClick={() => this.openAnswerModal(true)}
          >
          Add Answer
          </a>
        <AnswerModal
        open={this.state.isOpen}
        onClose={() => this.openAnswerModal(false)}
        question={this.props.question}
        updateQuestions={this.props.updateQuestions}
        >
          {/* HERE IS THE MODAL */}
        </AnswerModal>
          <a
            className={ProductCSS.helpfulQuestion}
            onClick={this.questionWasHelpful}
          >
            helpful? yes ({this.props.question.question_helpfulness})
          </a>
        </span>
        <div>
          {Object.values(this.props.question.answers).slice(0, this.state.count).map((answer) => (

            <Answers
              key={answer.id}
              id={this.props.question.question_id}
              answer={answer}
              updateQuestions={this.props.updateQuestions}
            />
            ))}
            <span className={ProductCSS.showMore}onClick={this.showMore}>load more answers</span>
            <span onClick={this.collapse}>collapse answers</span>
        </div>
      </div>
    )
  }
}

Question.propTypes = {
  question: PropTypes.object,
  styles: PropTypes.array,
  updateQuestions: PropTypes.func
}

export default Question;