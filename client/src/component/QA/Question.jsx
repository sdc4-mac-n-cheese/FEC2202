import React from 'react';
import Answers from './Answers.jsx';
import ProductCSS from '../cssModules/QA.module.css';
import axios from 'axios';
import AnswerModal from './AnswerModal.jsx';
import PropTypes from 'prop-types';
import { scroller } from 'react-scroll';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      isOpen: false,
      count: 2,
      helpful: false,
      helpfulCount: this.props.question.question_helpfulness
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

    scroller.scrollTo('topAnswer', {
      smooth: true,
      offset: -125,
      duration: 300
    })

    this.setState({ count: this.props.question.answers.length })
  }

  openAnswerModal(bool) {

    event.preventDefault();
    this.setState({ isOpen: bool })
  }

  questionWasHelpful(event) {

    if (this.state.helpful === true) {

      alert('You already said it was helpful!');
    } else {

      event.preventDefault();

      axios.put(`/helpfulQuestion?question_id=${this.props.question.question_id}`)
        .then(() => {
          this.setState({
            helpful: true,
            helpfulCount: this.state.helpfulCount + 1
          })
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }

  render() {

    const sortedAnswers = Object.values(this.props.question.answers).sort((a, b) => {
      return b.helpfulness - a.helpfulness;
    })

    if (sortedAnswers.length === 0) {

      return (

        <div className={ProductCSS.questions}>
          <div className={ProductCSS.questionBody}>Q: {this.props.question.question_body}
            <a
              className={ProductCSS.helpfulQuestion}
              onClick={this.questionWasHelpful}
            >
              Helpful? Yes ({this.state.helpfulCount})
            </a>
            <a
              className={ProductCSS.addAnswer}
              onClick={() => this.openAnswerModal(true)}
            >
              Be the first to answer!
            </a>
            <AnswerModal
              open={this.state.isOpen}
              onClose={() => this.openAnswerModal(false)}
              question={this.props.question}
              updateQuestions={this.props.updateQuestions}
            >
            </AnswerModal>
          </div>
          <div>
            {sortedAnswers.slice(0, this.state.count).map((answer) => (

              <Answers
                key={answer.id}
                id={this.props.question.question_id}
                answer={answer}
                updateQuestions={this.props.updateQuestions}
              />
            ))}
          </div>
        </div>
      )
    } else if (sortedAnswers.length <= 2) {

      return (

        <div className={ProductCSS.questions}>
          <div className={ProductCSS.questionBody}>Q: {this.props.question.question_body}
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
            </AnswerModal>
            <a
              className={ProductCSS.helpfulQuestion}
              onClick={this.questionWasHelpful}
            >
              Helpful? Yes ({this.state.helpfulCount})
            </a>
          </div>
          <div> A:
            {sortedAnswers.slice(0, this.state.count).map((answer) => (
              <Answers
                key={answer.id}
                id={this.props.question.question_id}
                answer={answer}
                updateQuestions={this.props.updateQuestions}
              />
            ))}
          </div>
        </div>
      )
    } else if (this.state.count === 2) {

      return (

        <div className={ProductCSS.questions}>
          <div className={ProductCSS.questionBody}>Q: {this.props.question.question_body}
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
            </AnswerModal>
            <a
              className={ProductCSS.helpfulQuestion}
              onClick={this.questionWasHelpful}
            >
              Helpful? Yes ({this.state.helpfulCount})
            </a>
          </div>
          <div className='topAnswer'> A:
            {sortedAnswers.slice(0, this.state.count).map((answer) => (

              <Answers
                key={answer.id}
                id={this.props.question.question_id}
                answer={answer}
                updateQuestions={this.props.updateQuestions}
              />
            ))}
            <br />
            <span className={ProductCSS.showMore} onClick={this.showMore}>Load More Answers</span>
          </div>
        </div>
      )
    } else {

      return (

        <div className={ProductCSS.questions}>
          <div className={ProductCSS.questionBody}>Q: {this.props.question.question_body}
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
            </AnswerModal>
            <a
              className={ProductCSS.helpfulQuestion}
              onClick={this.questionWasHelpful}
            >
              Helpful? Yes ({this.state.helpfulCount})
            </a>
          </div>
          <div className={ProductCSS.itemConfiguration}> A:
            {sortedAnswers.slice(0, this.state.count).map((answer) => (

              <Answers
                key={answer.id}
                id={this.props.question.question_id}
                answer={answer}
                updateQuestions={this.props.updateQuestions}
              />
            ))}
          </div>
          <br />
          <span className={ProductCSS.showMore} onClick={this.collapse}>Collapse Answers</span>
        </div>

      )
    }
  }
}

Question.propTypes = {
  question: PropTypes.object,
  styles: PropTypes.array,
  updateQuestions: PropTypes.func
}

export default Question;