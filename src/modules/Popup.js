import React, {Component} from 'react';
import {Map} from 'immutable';
import PropTypes from 'prop-types';

class Popup extends Component {
  render() {
    const {json, clickHandler} = this.props;

    let preparedJson = Map(json);

    if ('blocks' in preparedJson) {
      let tx = Map(preparedJson.tx);
      delete preparedJson.tx;
      console.log(tx);
    }

    return (
      <div className='popup'>
        <button type='button' className='popup-close close' aria-label='Close' onClick={clickHandler}>
          <span aria-hidden='true'>&times;</span>
        </button>
        <pre className='p-2 border'>
          {JSON.stringify(preparedJson, undefined, 2)}
        </pre>
      </div>
    )
  }
}

Popup.propTypes = {
  json: PropTypes.object,
  clickHandler: PropTypes.func
}

export default Popup;