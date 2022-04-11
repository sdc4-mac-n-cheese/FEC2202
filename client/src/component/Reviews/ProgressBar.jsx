import React from 'react';
import ProgressBarCSS from '../cssModules/Reviews/ProgressBar.module.css';

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const fillerStyles = {
    width: `${completed}%`,
    backgroundColor: bgcolor,
  }
  return (
    <div className={ProgressBarCSS.containerStyles}>
        <div className={ProgressBarCSS.fillerStyles} style={fillerStyles}>
          <span className={ProgressBarCSS.labelStyles}>{`${completed}%`}</span>
        </div>
    </div>
  );
};

export default ProgressBar;