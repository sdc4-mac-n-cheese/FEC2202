import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
configure({ adapter: new Adapter() });
import Outfitcard from '../component/Outfit/Outfitcard.jsx';
import Outfitcards from '../component/Outfit/Outfitcards.jsx';


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


})