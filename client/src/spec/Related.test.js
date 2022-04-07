import React from 'react';
import {expect} from 'chai';
import {configure, shallow,mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import Modal from '../component/RelatedItems/Modal.jsx';
import Relateditem from '../component/RelatedItems/Relateditem.jsx'


it('renders Modal pop-up window',()=>{
    shallow(<Modal />)
})


  describe ("RelatedItem card tests",()=>{
 
let id=1
let fakeitem={
    features: 
    [{feature: 'Lenses', value: 'Ultrasheen'},
    {feature: 'UV Protection', value: null},
    {feature: 'Frames', value: 'LightCompose'}]

}
//   it("renders table header", () => {
//     const wrapper = shallow(<Modal />);
//     const header = <th>Compared Item</th>;
//     expect(wrapper.contains(header)).to.exisit;
//   });

it('should find the right data type from props',()=>{
  
    const wrapper = mount(<Modal compareditem={fakeitem} />)
   // const buttonElement =wrapper.find('.relateditembutton');
    // expect(buttonElement).length
    expect(JSON.stringify(wrapper.props().compareditem)).to.equal(JSON.stringify(fakeitem))
})
  
it('should receive features as one of the props propterty',()=>{
    const wrapper = mount(<Modal compareditem={fakeitem} />)
    expect(wrapper.props().compareditem.features).to.exist
})

})
  