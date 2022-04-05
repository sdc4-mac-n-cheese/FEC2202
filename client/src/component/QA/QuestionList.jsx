import React from 'react';
import Question from './Question.jsx';
// import Answers from './Answers.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (

      <div>
        {this.props.currentQuestions.map((question) => (

          <>
            <Question
              question={question}
              key={question.question_id}
              updateQuestions={this.props.updateQuestions}
            />
            {/* <Answers
              answers={question.answers}
            // key={}
            /> */}
          </>

        ))}
      </div>
    )
  }
}

export default QuestionList;