import React from 'react';
import axios from 'axios';
import ProductCSS from '../cssModules/QA.module.css';
import moment from 'moment';
import PropTypes from 'prop-types';


class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      helpfulCount: this.props.answer.helpfulness,
      helpful: false,
      report: 'Report'
    }

    this.helpfulAnswer = this.helpfulAnswer.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

  reportAnswer(event) {
    event.preventDefault();
    axios.put(`/reportAnswer?answer_id=${this.props.answer.id}`)
    .then(() => {
      // this.props.updateQuestions();
      // alert('answer has been reported!')
      this.setState({
        report: 'Reported'
       })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  helpfulAnswer(event) {
    event.preventDefault();
    if (this.state.helpful === true) {
      alert('You already said it was helpful!')
    } else {

      axios.put(`/helpfulAnswer?answer_id=${this.props.answer.id}`)
        .then(this.setState({
          helpfulCount: this.state.helpfulCount + 1,
          helpful: true
        }),
          // this.props.updateQuestions()
        )
        .catch((err) => {
          console.error(err);
          //console.log(deleteME);
        })
    }
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
            <span>  By {this.props.answer.answerer_name}</span>
            <span>{moment(this.props.answer.date).format('MMM DD, YYYY')}</span>
            <a
              className={ProductCSS.reportAnswer}
              onClick={this.reportAnswer}
            >{this.state.report}</a>
            <a
              className={ProductCSS.helpfulAnswer}
              onClick={()=>this.helpfulAnswer}
              id={'increment-btn'}
            >Helpful? Yes ({this.state.helpfulCount})</a>
          </div>
        </div>
      </div>
    )
  }
}

Answers.propTypes = {
  helpfulness: PropTypes.number,
  answer: PropTypes.object,
  styles: PropTypes.array,
  updateQuestions: PropTypes.func
}

export default Answers;