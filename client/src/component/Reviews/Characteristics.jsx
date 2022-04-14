import React from 'react';
import PropTypes from 'prop-types';
import CharacteristicsBar from './CharacteristicsBar.jsx'
import CharacteristicsBarCSS from '../cssModules/Reviews/CharacteristicsBar.module.css';

class Characteristics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Size: -1,
      Width: -1,
      Comfort: -1,
      Quality: -1,
      Length: -1,
      Fit: -1,
      chars: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.mapCharacteristics = this.mapCharacteristics.bind(this);
  }

  componentDidMount() {
    var obj = {
      Size: -1,
      Width: -1,
      Comfort: -1,
      Quality: -1,
      Length: -1,
      Fit: -1
    };

    for (let i in this.props.chars.characteristics) {
      obj[i] = Number(this.props.chars.characteristics[i].value).toFixed(1)
    }

    this.setState({
      Size: Number(obj.Size),
      Width: Number(obj.Width),
      Comfort: Number(obj.Comfort),
      Quality: Number(obj.Quality),
      Length: Number(obj.Length),
      Fit: Number(obj.Fit)
    }, this.mapCharacteristics(obj))
  }

  mapCharacteristics(o) {
    var tempArr = [];
    for (let i in o) {
      if (o[i] !== -1) {
        let tempObj = {}
        tempObj[i] = o[i];
        tempArr.push(tempObj);
      }
    }
    this.setState({
      chars: tempArr
    });

  }

  render() {

    if (this.state.chars.length === 0) {
      return (
        <>meh</>
      )
    }

    else {
      return (
        <div className={CharacteristicsBarCSS.charBoxOutline}>
          {this.state.chars.map((char, i) => (
            <span>
              <span className={CharacteristicsBarCSS.numberAlign}>{Object.keys(char)}: {char[Object.keys(char)]}/6</span>
              <CharacteristicsBar
                char={char}
                key={i}
                bgcolor="#525252"
              />
            </span>
          ))}
        </div>
      )
    }
  }
}
Characteristics.propTypes = {
  chars: PropTypes.object
}

export default Characteristics;