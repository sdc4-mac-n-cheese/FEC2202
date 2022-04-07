import React from 'react';
import { expect } from 'chai';
import { configure, shallow } from 'enzyme';
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

// describe('Question event handlers', () => {

  // const question = [];

  // it('should show more answers on click', () => {
  //   const wrapper = shallow(<Question question={ question }/>);
  //   const text = wrapper.find('ProductCSS.showMore');
  //   expect(text.text()).toBe('load more answers');
  // });

  // it("has a 'load more answers' span tag", () => {

  //   const question = {};

  //   const wrapper = shallow(<Question question={question}/>);
  //   // const showMore = <span>load more answers</span>;
  //   expect(wrapper.contains(<span className={ProductCSS.showMore}>load more answers</span>)).to.equal(true);
  // });

// })

