import React from 'react';
import { expect } from 'chai';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import ProductDetail from '../component/ProductDetail/ProductDetail.jsx';
import Carousel from '../component/ProductDetail/Carousel.jsx';

it('renders Product Detail component', () => {
  shallow(<ProductDetail />);
});

describe('Carousel tests', () => {
  const style = {
    "style_id": 1,
    "name": "Forest Green & Black",
    "original_price": "140",
    "sale_price": "0",
    "default?": true,
    "photos": [
      {
        "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
        "url": "urlplaceholder/style_1_photo_number.jpg"
      },
      {
        "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
        "url": "urlplaceholder/style_1_photo_number.jpg"
      }]
  };

  it('carousel component accepts current style prop', () => {
    const wrapper = mount(<Carousel currStyle={style} />);
    expect(JSON.stringify(wrapper.props().currStyle)).to.equal(JSON.stringify(style))
  });

  it('contains photos property', () => {
    const wrapper = mount(<Carousel currStyle={style} />);
    expect(wrapper.props().currStyle.photos).to.exist;
  })
});
