import React from 'react';
import Question from './Question.jsx';
import ProductCSS from '../cssModules/QA.module.css';
// import Answers from './Answers.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      searchQuery: '',
      filteredQuestions: [],
      count: 4
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  showMore() {

    this.setState({ count: this.state.count + 4 })
  }

  handleSearch() {

    this.setState({ searchQuery: event.target.value })

  }

  render() {

    const filteredQuestions = this.props.currentQuestions.filter((question) => {
      return question.question_body.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    })

    return (


      <div>
        <span className={ProductCSS.main}>Questions and Answers</span>
        <br/>
        <input
        className={ProductCSS.searchBar}
        type='text'
        placeholder='have a question? search for answers...'
        onChange={this.handleSearch}
        />

        {this.state.searchQuery.length >= 3 ? (

          filteredQuestions.map((question) => (
            <>
              <Question
                question={question}
                key={question.question_id}
                updateQuestions={this.props.updateQuestions}
              />
            </>

          ))
          ) : (
            this.props.currentQuestions.slice(0, this.state.count).map((question) => (
              <>
                <Question
                  question={question}
                  key={question.question_id}
                  updateQuestions={this.props.updateQuestions}
                />
              </>


            ))
          )}

<a onClick={this.showMore}>More Answered Questions</a>
<a>Add A Question +</a>

      </div>
    )
  }
}

export default QuestionList;