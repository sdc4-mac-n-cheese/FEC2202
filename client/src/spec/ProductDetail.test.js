import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import ProductDetail from '../component/ProductDetail/ProductDetail.jsx';
import Carousel from '../component/ProductDetail/Carousel.jsx';
import StyleSelector from '../component/ProductDetail/StyleSelector.jsx';

describe('Product Detail tests', () => {
  it('renders Product Detail component', () => {
    shallow(<ProductDetail />);
  });
});

const products = [
  {
    "id": 1,
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": "140"
  },
  {
    "id": 2,
    "name": "Bright Future Sunglasses",
    "slogan": "You've got to wear shades",
    "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
    "category": "Accessories",
    "default_price": "69"
  },
  {
    "id": 3,
    "name": "Morning Joggers",
    "slogan": "Make yourself a morning person",
    "description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
    "category": "Pants",
    "default_price": "40"
  },
];

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

describe('Carousel tests', () => {
  it('carousel component accepts current style prop', () => {
    const wrapper = mount(<Carousel currStyle={style} />);
    expect(JSON.stringify(wrapper.props().currStyle)).toEqual(JSON.stringify(style))
  });

  it('contains photos property', () => {
    const wrapper = mount(<Carousel currStyle={style} />);
    expect(wrapper.props().currStyle.photos).toExist;
  })
});

describe('Style Selector tests', () => {
  it('style selector renders the correct number of image styles', () => {
    const wrapper = mount(<StyleSelector />)
  });
});