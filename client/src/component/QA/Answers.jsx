import React from 'react';
import axios from 'axios';
import ProductCSS from '../cssModules/QA.module.css';

class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      currentAnswers: [],
      count: 2,
      // loadMore: false
    }

    this.getAnswers = this.getAnswers.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  showMore() {

    this.setState({ count: this.state.count + 2 })
    this.getAnswers()
  }

  componentDidMount() {

    this.getAnswers()
  }

  getAnswers() {
    axios.get('/getAnswers', {
      params: {
        question_id: this.props.id,
        page: 1,
        count: this.state.count
      }
    })
      .then((response) => {
        console.log('RES', response.data)
        this.setState({ currentAnswers: response.data.results })
        this.props.updateQuestions();
        // console.log('results>>>', response.results)
        // return response.results;
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    // if (this.state.loadMore === false && this.state.currentAnswers.length > 2) {

    return (
      <div className={ProductCSS.answers}>
       A. {this.state.currentAnswers.map((answer) => (
          // console.log('YOOOOOO', answer)
          <div>{answer.body}</div>
        ))}
        <button onClick={this.showMore}>load more answers</button>
      </div>
    )
  }
}

export default Answers;