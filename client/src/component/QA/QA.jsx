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
    this.newQuestions = this.newQuestions.bind(this);
  }

  newQuestions(questions) {

    this.setState({
      currentQuestions: questions
     })
  }

  updateQuestions() {
    // console.log('inside updateQuestions', this.props.id)
    // event.preventDefault();
    axios.get('/getQuestions', {
      params: {
        product_id: this.props.id,
        page: 1,
        count: 100
      }
    })
      .then((questions) => {
        // console.log('updateQuestions.then', questions)
        this.setState({ currentQuestions: questions.data.results })
        this.componentDidMount()
      })
      .catch((err) => {
        console.error(err)
      })
    // this.componentDidMount();
  }

  componentDidUpdate(prevProps) {

    // this.setState({ currentProduct: this.props.id })
    if (this.props.id !== prevProps.id) {
      this.componentDidMount();
    }

  }


  componentDidMount() {
    // console.log('component did mount props', this.props.id)
    // console.log('component did mount state', this.state.currentQuestions)

    // this.setState({ currentProduct: this.props.id })
  //  event.preventDefault();
    axios.get('/getQuestions', {
      params: {
        product_id: this.props.id,
        // product_id: this.props.id,
        page: 1,
        count: 100
      }
    })
      .then((questions) => {
        console.log('component did mount .then', questions)
        this.setState({
          currentQuestions: questions.data.results
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }


  render() {
    return (

      <div >
        {/* {this.updateQuestions()} */}
        {/* <span className={ProductCSS.main}>Questions and Answers</span>
        <br/>
        <input
        className={ProductCSS.searchBar}
        type='text'
        placeholder='search for questions' /> */}
        {/* {console.log('QA render', this.state.currentProduct)} */}
        <QuestionList
          className={ProductCSS.main}
          currentQuestions={this.state.currentQuestions}
          currentProduct={this.props.id}
          updateQuestions={this.updateQuestions}
          newQuestions={this.newQuestions}
        />
      </div>

    )
  }
}

export default QA;