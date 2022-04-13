// import React, { useState } from 'react';
import React from 'react';
import ProductCSS from '../cssModules/QA.module.css'
import axios from 'axios';
import QuestionList from './QuestionList.jsx';
import PropTypes from 'prop-types';

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      currentQuestions: [],
      currentAnswers: []
    }

    this.updateQuestions = this.updateQuestions.bind(this);
  }

  updateQuestions() {

    axios.get('/getQuestions', {
      params: {
        product_id: this.props.id,
        page: 1,
        count: 100
      }
    })
      .then((questions) => {
        this.setState({ currentQuestions: questions.data.results })
        this.componentDidMount()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  componentDidUpdate(prevProps) {

    if (this.props.id !== prevProps.id) {
      this.componentDidMount();
    }
  }

  componentDidMount() {

    axios.get('/getQuestions', {
      params: {
        product_id: this.props.id,
        page: 1,
        count: 100
      }
    })
      .then((questions) => {
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
        <QuestionList
          className={ProductCSS.main}
          currentQuestions={this.state.currentQuestions}
          currentProduct={this.props.id}
          updateQuestions={this.updateQuestions}
        />
      </div>
    )
  }
}

QA.propTypes = {

  id: PropTypes.number,
}

export default QA;