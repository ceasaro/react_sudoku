import * as React from 'react';

class Cell extends React.Component {
  render() {
    return (
      <div className="cell">
        <span className="options-top"></span>
        <span className="number"></span>
        <span className="fixed-options"></span>
        <span className="options-bottom"></span>
      </div>
    );
  }
}

export default Cell