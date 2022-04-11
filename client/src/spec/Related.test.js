import React from 'react';
import ReactDOM from 'react-dom';
import jest from "jest";
import {configure, shallow,mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
configure({ adapter: new Adapter() });
import Modal from '../component/RelatedItems/Modal.jsx';
import Relateditem from '../component/RelatedItems/Relateditem.jsx'
import Relatedcards from '../component/RelatedItems/Relatedcards'


// it('renders Modal pop-up window',()=>{
//     shallow(<Modal />)
// })


//   describe ("popup Modal tests",()=>{
 
// let id=1
// let fakeitem={
//     features: 
//     [{feature: 'Lenses', value: 'Ultrasheen'},
//     {feature: 'UV Protection', value: null},
//     {feature: 'Frames', value: 'LightCompose'}]

// }
// //   it("renders table header", () => {
// //     const wrapper = shallow(<Modal />);
// //     const header = <th>Compared Item</th>;
// //     expect(wrapper.contains(header)).to.exisit;
// //   });

// it('should find the right data type from props',()=>{
  
//     const wrapper = mount(<Modal compareditem={fakeitem} />)
//    // const buttonElement =wrapper.find('.relateditembutton');
//     // expect(buttonElement).length
//     expect(JSON.stringify(wrapper.props().compareditem)).toEqual(JSON.stringify(fakeitem))
// })
  
// it('should receive features as one of the props propterty',()=>{
//     const wrapper = mount(<Modal compareditem={fakeitem} />)
//     expect(wrapper.props().compareditem.features).toExist
// })



// test("match snapshot", ()=>{
//     let wrapper = shallow(<Modal />);
//     expect(toJSON(wrapper)).toMatchSnapshot()
// })

//failling test
// test("render the content",()=>{
//     ReactDOM.createPortal = jest.fn(modal => modal);
//     let wrapper = shallow(<Modal />);
//     console.log(wrapper.debug())
//     const closebutton=wrapper.find('.onClose')
//     console.log("closebutton>>>>",closebutton.debug())
//    expect(closebutton.text()).toBe('X')
// })
//--repetative test
// test("render nonempty modal without crashing",()=>{
//     let wrapper = shallow(<Modal />);
//     expect(wrapper.exists()).toBe(true)
// })
// test("match snapshot",()=>{
//     let wrapper = shallow(<Relatedcards /> );
//     expect(toJSON(wrapper)).toMatchSnapshot();
// })


})
  