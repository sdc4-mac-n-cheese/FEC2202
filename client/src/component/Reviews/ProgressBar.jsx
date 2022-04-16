import React from 'react';
import PropTypes from 'prop-types';
import ProgressBarCSS from '../cssModules/Reviews/ProgressBar.module.css';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fillerStyles = {
      width: `${this.props.completed}%`,
      backgroundColor: this.props.bgcolor,
    }
    return (
      <div
        className={ProgressBarCSS.containerStyles}
      >
        <div
          className={ProgressBarCSS.fillerStyles} style={fillerStyles}>
          <span
            className={ProgressBarCSS.labelStyles}>{`${this.props.completed}%`}
          </span>
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  completed: PropTypes.object,
  bgcolor: PropTypes.string
}
export default ProgressBar;