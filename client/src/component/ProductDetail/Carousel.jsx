import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import ProductCSS from '../cssModules/ProductDetail.module.css';
import VerticalCarousel from './VerticalCarousel.jsx'

const Carousel = (props) => {
  const styles = props.currStyle.photos;

  const [currIndex, setCurrIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');

  const next = () => {
    setCurrIndex(currIndex === styles.length - 1 ? 0 : currIndex + 1);
  }

  const prev = () => {
    setCurrIndex(currIndex === 0 ? 0 : currIndex - 1);
  }

  const open = (photo) => {
    setModalPhoto(photo);
    setIsOpen(true);
  }

  const close = () => {
    setIsOpen(false);
  }

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  }

  Modal.setAppElement('#root');

  return (
    <>
      <div className={ProductCSS.carousel}>
        <VerticalCarousel styles={styles} currIndex={currIndex} setCurrIndex={setCurrIndex} />
        <div className={ProductCSS.carouselView} style={{ transform: `translateX(-${currIndex * 101}%)` }}>
          {styles.map((photo, i) =>
            <div className={ProductCSS.carouselItem} key={i}>
              <i className="fa fa-arrows-alt" aria-hidden="true" onClick={() => open(photo.url)}></i>
              <img className={ProductCSS.spotlight} src={photo.url} alt='product style' />
            </div>
          )}
        </div>
        <button className={currIndex !== 0 ? ProductCSS.leftBtn : `${ProductCSS.leftBtn} ${ProductCSS.hidden}`} onClick={prev}>&lt;</button>
        <button className={ProductCSS.rightBtn} onClick={next}>&gt;</button>

        <div className={ProductCSS.social}>
          <i className="fa fa-facebook-square" aria-hidden="true"></i>
          <i className="fa fa-twitter-square" aria-hidden="true"></i>
          <i className="fa fa-pinterest-square" aria-hidden="true"></i>
        </div>
      </div>

      <Modal
        className={ProductCSS.modal}
        isOpen={isOpen}
        onRequestClose={close}
      >
        <div className={ProductCSS.modalPhotoContainer} onMouseMove={handleMouseMove} style={{
          backgroundImage: `url(${modalPhoto})`,
          backgroundPosition: backgroundPosition
        }}>
          <img src={modalPhoto} alt='product style' />
        </div>
      </Modal>
    </>
  );
}

Carousel.propTypes = {
  currStyle: PropTypes.object,
  productId: PropTypes.number
}

export default Carousel;