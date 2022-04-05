// import React, { useState } from 'react';
import React from 'react';
import ProductCSS from '../cssModules/QA.module.css'
import axios from 'axios';
import QuestionList from './QuestionList.jsx';

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      // currentProduct: this.props.id,
      currentQuestions: [],
      currentAnswers: []
    }

    // this.getQuestions = this.getQuestions.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
  }

  updateQuestions() {
    // console.log('YOOOOO1!!!!', this.props.id)
    axios.get('/getQuestions', {
      params: {
        product_id: this.props.id,
        page: 1,
        count: 4
      }
    })
      .then((questions) => {
        // console.log('here>>>>>', questions)
        this.setState({ currentQuestions: questions.data.results })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  componentDidMount() {
    // console.log('YOOOOO!!!!', this.props.id)

    axios.get('/getQuestions', {
      params: {
        product_id: this.props.id,
        page: 1,
        count: 4
      }
    })
      .then((questions) => {
        // console.log('here>>>>>', questions)
        this.setState({ currentQuestions: questions.data.results })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    return (

      <div >
        <span className={ProductCSS.main}>Questions and Answers</span>
        <br/>
        <input className={ProductCSS.searchBar} type='text' placeholder='search for questions' />
        <QuestionList
          className={ProductCSS.main}
          currentQuestions={this.state.currentQuestions}
          updateQuestions={this.updateQuestions}
        />
      </div>

    )
  }
}

export default QA;