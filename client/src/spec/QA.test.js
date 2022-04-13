import React from 'react';
// import { expect } from 'chai';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import QA from '../component/QA/QA.jsx';
import QuestionList from '../component/QA/QuestionList.jsx';
import Question from '../component/QA/Question.jsx';
import ProductCSS from '../cssModules/QA.module.css';
import Answers from '../component/QA/Answers.jsx';
import AnswerModal from '../component/QA/AnswerModal.jsx';
import QuestionModal from '../component/QA/QuestionModal.jsx';

describe('QA component and child components', () => {

  const question = {

    "question_id": 573904,
    "question_body": "Does this product run big or small?",
    "question_date": "2018-04-04T00:00:00.000Z",
    "asker_name": "smithsmith",
    "question_helpfulness": 12,
    "reported": false,
    "answers": {
      "5361425": {
        "id": 5361425,
        "body": "Runs small, I'd say",
        "date": "2018-06-04T00:00:00.000Z",
        "answerer_name": "smithsmith",
        "helpfulness": 7,
        "photos": []
      }

      // "5361426": {
      //   "id": 5361426,
      //   "body": "Runs small, I'd say",
      //   "date": "2018-06-04T00:00:00.000Z",
      //   "answerer_name": "smithsmith",
      //   "helpfulness": 10,
      //   "photos": []
      // }
    }
  };

  const answer = {
    "answer_id": 5361401,
    "body": "The rubber on the bottom wears thin quickly",
    "date": "2019-02-18T00:00:00.000Z",
    "answerer_name": "marcanthony",
    "helpfulness": 9,
    "photos": []
  };

  it('renders QA component', () => {
    shallow(<QA />);
  });

  test('helpful button should increment count by 1', () => {
    const wrapper = shallow(<Answers answer={question.answers} helpfulCount={question.answers["5361425"].helpfulness} />);
    // const component = wrapper.instance().state;
    const component = wrapper.instance().props;
    wrapper.find('#increment-btn').simulate('click');
    expect(component.helpfulCount).toBe(question.answers["5361425"].helpfulness + 1)
    // console.log('HERE>>>>>', wrapper.instance().state.helpfulCount)
    // expect(question.answers["5361425"].helpfulness).toBe(question.answers["5361425"].helpfulness + 1)
  });

});

// it('should show more answers on click', () => {
//   const wrapper = shallow(<Question question={ question }/>);
//   // console.log('here>>', wrapper.debug())
//   const showMoreButton = wrapper.find('.showMore');
//   console.log('text', showMoreButton.debug())
//   expect(showMoreButton.text()).toBe('load more answers');
//   // expect(text.text()).toBe('load more answers');
// });


