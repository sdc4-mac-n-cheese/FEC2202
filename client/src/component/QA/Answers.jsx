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
        .then(() => {
          this.setState({
            helpfulCount: this.state.helpfulCount + 1,
            helpful: true
          })
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }

  render() {

    return (

      <div className={ProductCSS.answers}>
        <div>
          <span className={ProductCSS.answerBody} >{this.props.answer.body}</span>
        </div>
        <span className={ProductCSS.pictureScroller}>
          {this.props.answer.photos.map((photo, index) => (
            <img src={photo} key={index} className={ProductCSS.imageDetails} />
          ))}
        </span>
        <div>
          <span>  By {this.props.answer.answerer_name}</span>
          <span>{moment(this.props.answer.date).format('MMM DD, YYYY')}</span>
          <span
            className={ProductCSS.reportAnswer}
            onClick={this.reportAnswer}
          >
            {this.state.report}
          </span>
          <span
            className={ProductCSS.helpfulAnswer}
            onClick={this.helpfulAnswer}
            id={'increment-btn'}
          >
            Helpful? Yes ({this.state.helpfulCount})
          </span>
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