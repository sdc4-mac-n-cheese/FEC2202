/* eslint-disable no-undef */
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import ProductDetail from '../component/ProductDetail/ProductDetail.jsx';
import Carousel from '../component/ProductDetail/Carousel.jsx';
<<<<<<< HEAD
=======
import ProductInfo from '../component/ProductDetail/ProductInfo.jsx';
>>>>>>> main
import StyleSelector from '../component/ProductDetail/StyleSelector.jsx';

describe('Product Detail tests', () => {
  it('renders Product Detail component', () => {
    shallow(<ProductDetail />);
<<<<<<< HEAD
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

// describe('Carousel tests', () => {
//   it('carousel component accepts current style prop', () => {
//     const wrapper = mount(<Carousel currStyle={style} />);
//     expect(JSON.stringify(wrapper.props().currStyle)).toEqual(JSON.stringify(style))
//   });

//   it('contains photos property', () => {
//     const wrapper = mount(<Carousel currStyle={style} />);
//     expect(wrapper.props().currStyle.photos).toExist;
//   })
// });

// describe('Style Selector tests', () => {
//   it('style selector renders the correct number of image styles', () => {
//     const wrapper = mount(<StyleSelector />)
//   });
// });
=======
  });
});

const product = {
  "id": 1,
  "name": "Camo Onesie",
  "slogan": "Blend in to your crowd",
  "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
  "category": "Jackets",
  "default_price": "140"
}

const allStyles = [
  {
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
  },
  {
    "style_id": 2,
    "name": "Desert Brown & Tan",
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
  }
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
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(<Carousel currStyle={style} />);
  });

  it('carousel component accepts current style prop', () => {
    expect(JSON.stringify(wrapper.props().currStyle)).toEqual(JSON.stringify(style))
  });

  it('contains photos property', () => {
    expect(wrapper.props().currStyle.photos).toExist;
  });
});


describe('Product Info tests', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(<ProductInfo currStyle={allStyles[0]} product={product} styles={allStyles} />)
  });

  it('renders relevant product information', () => {
    let productName = wrapper.find('h1');
    expect(productName.text()).toEqual(product.name);
  });
});


describe('Style Selector tests', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(<StyleSelector currStyle={style} styles={allStyles} />);
  });

  it('style selector component should render image', () => {
    expect(wrapper.find('img')).toExist;
  });

  it('selected style should render selected features (i.e. checkmark)', () => {
    let imgWrapper = wrapper.find('.styleSelector');
    expect(imgWrapper.find('span')).toHaveLength(1);
  });
});
>>>>>>> main
