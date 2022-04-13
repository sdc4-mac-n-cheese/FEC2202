import React from 'react';
import PropTypes from 'prop-types';
import CharacteristicsBarCSS from '../cssModules/Reviews/CharacteristicsBar.module.css';

// bgcolor, char[Object.keys(char)], Object.keys(char)
const CharacteristicsBar = (props) => {
  const { bgcolor, char } = props;

  const fillerStyles = {
    width: `${(Number(char[Object.keys(char)]) * 100 / 6).toFixed(1)}%`,
    backgroundColor: bgcolor,
  }

  return (

    <div className={CharacteristicsBarCSS.containerStyles}>
        <div className={CharacteristicsBarCSS.fillerStyles} style={fillerStyles}>
          <span className={CharacteristicsBarCSS.labelStyles}></span>
        </div>
    </div>
  );
};


export default CharacteristicsBar;