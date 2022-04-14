import React from 'react';
import Question from './Question.jsx';
import QuestionModal from './QuestionModal.jsx';
import ProductCSS from '../cssModules/QA.module.css';
import PropTypes from 'prop-types';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      searchQuery: '',
      filteredQuestions: [],
      count: 2,
      isOpen: false
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.showMore = this.showMore.bind(this);
    this.openQuestionModal = this.openQuestionModal.bind(this);
  }

  openQuestionModal(bool) {

    this.setState({ isOpen: bool })
  }

  componentDidUpdate(prevProps) {

    if (this.props.currentQuestions !== prevProps.currentQuestions) {

      this.setState({ count: 2 })
    }
  }

  showMore() {

    this.setState({ count: this.state.count + 2 })
  }

  handleSearch() {

    this.setState({ searchQuery: event.target.value })
  }

  render() {

    const filteredQuestions = this.props.currentQuestions.filter((question) => {
      return question.question_body.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    })

    if (this.props.currentQuestions.length <= 2 || this.state.count >= this.props.currentQuestions.length) {

      return (

        <div>
          <br/>
          <span className={ProductCSS.main}>Questions & Answers</span>
          <br />
          <input
            className={ProductCSS.searchBar}
            type='text'
            placeholder='have a question? search for answers...'
            onChange={this.handleSearch}
          />

          {this.state.searchQuery.length >= 3 ? (

            filteredQuestions.map((question) => (
              <>
                <br />
                <Question
                  question={question}
                  key={question.question_id}
                  updateQuestions={this.props.updateQuestions}
                  currentProduct={this.props.currentProduct}
                />
              </>

            ))
          ) : (
            this.props.currentQuestions.slice(0, this.state.count).map((question) => (
              <>
                <br />
                <Question
                  question={question}
                  key={question.question_id}
                  updateQuestions={this.props.updateQuestions}
                  currentProduct={this.props.currentProduct}
                />
              </>
            ))
          )}
          <QuestionModal
            open={this.state.isOpen}
            onClose={() => this.openQuestionModal(false)}
            currentProduct={this.props.currentProduct}
            updateQuestions={this.props.updateQuestions}
          ></QuestionModal>
          <br />
          <a className={ProductCSS.addLoad} onClick={() => this.openQuestionModal(true)} >Add A Question +</a>
        </div>
      )
    } else {

      return (

        <div>
          <br />
          <span className={ProductCSS.main}>Questions & Answers</span>
          <br />
          <input
            className={ProductCSS.searchBar}
            type='text'
            placeholder='have a question? search for answers...'
            onChange={this.handleSearch}
          />

          {this.state.searchQuery.length >= 3 ? (

            filteredQuestions.map((question) => (
              <>
                <br />
                <Question
                  question={question}
                  key={question.question_id}
                  updateQuestions={this.props.updateQuestions}
                  currentProduct={this.props.currentProduct}
                />
              </>
            ))
          ) : (
            this.props.currentQuestions.slice(0, this.state.count).map((question) => (
              <>
                <br />
                <Question
                  question={question}
                  key={question.question_id}
                  updateQuestions={this.props.updateQuestions}
                  currentProduct={this.props.currentProduct}
                />
              </>
            ))
          )}
          <QuestionModal
            open={this.state.isOpen}
            onClose={() => this.openQuestionModal(false)}
            currentProduct={this.props.currentProduct}
            updateQuestions={this.props.updateQuestions}
          ></QuestionModal>
          <br />
          <a className={ProductCSS.addLoad} onClick={this.showMore}>Load More Questions</a>
          <a className={ProductCSS.addLoad} onClick={() => this.openQuestionModal(true)}>Add A Question +</a>
        </div>
      )
    }
  }
}

QuestionList.propTypes = {

  currentProduct: PropTypes.number,
  updateQuestions: PropTypes.func,
  currentQuestions: PropTypes.array,
}

export default QuestionList;