import React from 'react';
import ProgressBarCSS from '../cssModules/Reviews/ProgressBar.module.css';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick(e) {
  //   e.preventDefault();
  //   // console.log('star index', this.props.starIndex);
  //   // console.log('current filter', this.props.filterArr);
  //   if (this.props.filterArr === -1 || this.props.filterArr === 0) {
  //     //elevate 1 back
  //     // console.log('in the filter -1, 0');
  //     this.props.changeRatingFilter(this.props.starIndex, 1);
  //   }
  //   else if (this.props.filterArr === 1) {
  //     //elevate 0 back
  //     // console.log('in filter 1');
  //     this.props.changeRatingFilter(this.props.starIndex, 0);
  //   }
  // }
  render() {
    const fillerStyles = {
      width: `${this.props.completed}%`,
      backgroundColor: this.props.bgcolor,
    }
    return (
      <div
        className={ProgressBarCSS.containerStyles}
        // onClick={this.handleClick}
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

export default ProgressBar;
// const ProgressBar = (props) => {
//   const { bgcolor, completed } = props;

//   const fillerStyles = {
//     width: `${completed}%`,
//     backgroundColor: bgcolor,
//   }
//   return (
//     <div className={ProgressBarCSS.containerStyles}>
//         <div className={ProgressBarCSS.fillerStyles} style={fillerStyles}>
//           <span className={ProgressBarCSS.labelStyles}>{`${completed}%`}</span>
//         </div>
//     </div>
//   );
// };

// export default ProgressBar;