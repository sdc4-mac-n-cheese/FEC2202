import React from 'react';
import Answers from './Answers.jsx';
import ProductCSS from '../cssModules/QA.module.css';
import axios from 'axios';
import AnswerModal from './AnswerModal.jsx';
import PropTypes from 'prop-types';
// import { scroller } from "react-scroll";

// const QUESTION_STYLES = {

//   postion: 'relative',
//   top: '100px'

// }

class Question extends React.Component {
  constructor(props) {
    super(props);
    // this.myRef = React.createRef();
    this.state = {

      // currentProduct: this.props.currentProduct,
      // question: this.props.question
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

  // componentDidUpdate(prevProps) {
  //   if (this.props.question.answers !== prevProps.question.answers) {
  //     this.componentDidMount()
  //   }
  // }

  collapse() {

    this.setState({ count: 2 })
  }

  showMore() {

    this.setState({ count: this.props.question.answers.length })
    // scroller.scrollTo("s7YtBFULKfomjOZdE_Mg")
    // window.scrollTo(0, this.myRef.current.offsetTop)
  }

  openAnswerModal(bool) {

    event.preventDefault();
    this.setState({ isOpen: bool })
    // this.props.updateQuestions();
  }

  // closeAnswerModal() {

  //   this.setState({ isOpen: false })
  // }

  questionWasHelpful(event) {

    if (this.state.helpful === true) {
      alert('You already said it was helpful!');
    } else {

      event.preventDefault();
      // console.log('inside help', this.props.question)
      axios.put(`/helpfulQuestion?question_id=${this.props.question.question_id}`)
        .then(() => {
          this.setState({
            helpful: true,
            helpfulCount: this.state.helpfulCount + 1
          })
          // this.props.updateQuestions()
        })
        .catch((err) => {
          console.error(err);
        })
    }

  }

  render() {
    // console.log('in render question', this.state.question)

    const sortedAnswers = Object.values(this.props.question.answers).sort((a, b) => {
      return b.helpfulness - a.helpfulness;
    })
    // console.log('Sorted>>>>>>', sortedAnswers)

    if (sortedAnswers.length === 0) {
      return (
        <div className={ProductCSS.questions}>
          <span>Q: {this.props.question.question_body}
            <a
              className={ProductCSS.helpfulQuestion}
              onClick={this.questionWasHelpful}
            >
              Helpful? Yes ({this.state.helpfulCount})
            </a>
            <a
              className={ProductCSS.addFirstAnswer}
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
              {/* HERE IS THE MODAL */}
            </AnswerModal>
          </span>
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
          <span>Q: {this.props.question.question_body}
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
              Helpful? Yes ({this.state.helpfulCount})
            </a>
          </span>
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
          <span>Q: {this.props.question.question_body}
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
              Helpful? Yes ({this.state.helpfulCount})
            </a>
          </span>
          <div> A:
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
            {/* <span onClick={this.collapse}>collapse answers</span> */}
          </div>
        </div>
      )
    } else {

      return (
        <div className={ProductCSS.questions}>
          <span ref={this.myRef}>Q: {this.props.question.question_body}
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
              Helpful? Yes ({this.state.helpfulCount})
            </a>
          </span>
          <div className={ProductCSS.itemConfiguration}> A:
            {sortedAnswers.slice(0, this.state.count).map((answer) => (

              <Answers
                key={answer.id}
                id={this.props.question.question_id}
                answer={answer}
                updateQuestions={this.props.updateQuestions}
              />
            ))}

            {/* <span className={ProductCSS.showMore}onClick={this.showMore}>load more answers</span> */}
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