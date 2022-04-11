import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
configure({ adapter: new Adapter() });
import Outfitcard from '../component/Outfit/Outfitcard.jsx';
import Outfitcards from '../component/Outfit/Outfitcards.jsx';
import { unmountComponentAtNode } from "react-dom";
import {act} from "react-dom/test-utils"
import {jest} from '@jest/globals'

describe ("Outfit card test",()=>{

    let fakedata= {
        category:"test",
        default_price: "123",
        id: 123,
        image:"http://dasacounseling.weebly.com/uploads/5/6/1/4/56149545/2263864_orig.jpg",
        name: "testing product"
    }

    it('Renders outfit card ',()=>{
        shallow(< Outfitcard item={fakedata}/>)
    })
    
    test("match snapshot", ()=>{
        let wrapper = shallow(<Outfitcard item={fakedata}/>);
        expect(toJSON(wrapper)).toMatchSnapshot()
    })

    it("should have a botton with a cross",()=>{
        let wrapper = shallow(<Outfitcard item={fakedata}/>);
        const crossButton = wrapper.find('.outfitcardbutton')
        expect(crossButton.length).toBe(1)
    })
test ("rending outfitcard without error",()=>{
    let wrapper = shallow(<Outfitcard item={fakedata}/>);
    const outfitComponent=wrapper.find("[enzyme-test='outfitcard']");
    expect(outfitComponent.length).toBe(1)
})
test ("rending delete outfit card button",()=>{
    let wrapper = shallow(<Outfitcard item={fakedata}/>);
    const deletebutton=wrapper.find("[enzyme-test='deleteoutfitbutton']");
    expect(deletebutton.length).toBe(1)
})

describe("", () => {
    it("accepts product props", () => {
      const wrapper = mount(<Outfitcard item={fakedata}/>);
      expect(wrapper.props().item).toEqual(fakedata);
    });
})
it("contains product name", () => {
    const wrapper = mount(<Outfitcard item={fakedata}/>);
    const value = wrapper.find("h3").text();
    expect(value).toEqual("testing product");
  });

  it("contains product name", () => {
    const wrapper = mount(<Outfitcard item={fakedata}/>);
    const value = wrapper.find("p").text();
    expect(value).toEqual("test");
  });
//   it("renders correctly with no error message", () => {
//     const wrapper = mount();
//     expect(wrapper.state("error")).toEqual(null);
//   });
test ("has classname",()=>{
    const wrapper = shallow(<Outfitcard item={fakedata}/>);
    expect(wrapper.find('img').hasClass('image')).toEqual(true);
})


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it("Expects to run onClick function when button is pressed in the DOM", () => {
    var collection=[]
    const mockCallBackClick = jest.fn();
    const wrapper = shallow(<Outfitcard item={fakedata}/>);
    wrapper.find('button').simulate('click');
    expect(mockCallBackClick).tohaveBeenCalled()
});
})