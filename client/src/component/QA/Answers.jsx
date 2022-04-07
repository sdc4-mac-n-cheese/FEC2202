import React from 'react';
import axios from 'axios';
import ProductCSS from '../cssModules/QA.module.css';
import moment from 'moment';


class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      helpfulCount: this.props.answer.helpfulness,
      // report: false
    }

    this.helpfulAnswer = this.helpfulAnswer.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

  reportAnswer(event) {
    event.preventDefault();
    axios.put(`/reportAnswer?answer_id=${this.props.answer.id}`)
    .then(() => {
      this.props.updateQuestions();
      alert('answer has been reported!')
    })
    .catch((err) => {
      console.error(err);
    })
  }

  helpfulAnswer(event) {
    event.preventDefault();
    axios.put(`/helpfulAnswer?answer_id=${this.props.answer.id}`)
      .then(this.setState({
        helpfulCount: this.state.helpfulCount++
      }),
        this.props.updateQuestions()
      )
      .catch((err) => {
        console.error(err);
        //console.log(deleteME);
      })
  }

  render() {
    // if (this.state.loadMore === false && this.state.currentAnswers.length > 2) {

    return (
      <div className={ProductCSS.answers}>
        <div>
          <div>
            <span> {this.props.answer.body}</span>
          </div>
          <div>
            <span>  by {this.props.answer.answerer_name}</span>
            <span>{moment(this.props.answer.date).format('MMM DD, YYYY')}</span>
            <a
              className={ProductCSS.reportAnswer}
              onClick={this.reportAnswer}
            >report</a>
            <a
              className={ProductCSS.helpfulAnswer}
              onClick={this.helpfulAnswer}
            >helpful? yes ({this.props.answer.helpfulness})</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Answers;