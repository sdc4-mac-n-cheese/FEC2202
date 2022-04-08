import React from 'react';
// import { expect } from 'chai';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import QA from '../component/QA/QA.jsx';
// import QuestionList from '../component/QA/QuestionList.jsx';
import Question from '../component/QA/Question.jsx';
import ProductCSS from '../cssModules/QA.module.css';
// import Answers from '../component/QA/Answers.jsx';

describe('render all components', () => {

  it('renders QA component', () => {
    shallow(<QA />);
  });

});

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
    },
  }
};
describe('Question event handlers', () => {


it('should show more answers on click', () => {
  const wrapper = shallow(<Question question={ question }/>);
  // console.log('here>>', wrapper.debug())
  const showMoreButton = wrapper.find('.showMore');
  console.log('text', showMoreButton.debug())
  expect(showMoreButton.text()).toBe('load more answers');
  // expect(text.text()).toBe('load more answers');
});

// it("has a 'load more answers' span tag", () => {

//   const question = {


//     "question_id": 573904,
//     "question_body": "Does this product run big or small?",
//     "question_date": "2018-04-04T00:00:00.000Z",
//     "asker_name": "smithsmith",
//     "question_helpfulness": 12,
//     "reported": false,
//     "answers": {
//       "5361425": {
//         "id": 5361425,
//         "body": "Runs small, I'd say",
//         "date": "2018-06-04T00:00:00.000Z",
//         "answerer_name": "smithsmith",
//         "helpfulness": 7,
//         "photos": []
//       },
//     }
//   }

//   const wrapper = mount(<Question question={question} />);
//   // const showMore = <span>load more answers</span>;
//   console.log('here>>>', wrapper);
//   expect(wrapper.contains(<span className={ProductCSS.showMore}>load more answers</span>)).to.equal(true);
// });

})

