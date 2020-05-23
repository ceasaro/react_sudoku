import * as React from 'react';

const InitialCellData = {
    'selected': false,
    'editable': false,
    'faulty': false,
    'given': null,
    'number': null,
    'fixed': [],
    'optionsTop': [],
    'optionsBottom': [],
    'x': null,
    'y': null
}

class Cell extends React.Component {

    render() {
        let cell;
        if (this.props.given) {
            cell = <span className="number given">{this.props.given}</span>;
        } else {
            cell = <div>
                <span className="options-top">{this.listToString(this.props.optionsTop)}</span>
                <span className="number ">{this.props.number}</span>
                <span className="fixed-options">{this.listToString(this.props.fixed)}</span>
                <span className="options-bottom">{this.listToString(this.props.optionsBottom)}</span>
            </div>
        }
        return (
            <div className={`cell ${this.props.selected?'selected': ''} ${this.props.editable?'editable': ''} ${this.props.faulty?'faulty': ''}`}
                 onClick={(e) => this.props.handleCellClick(this.props.x, this.props.y, e.ctrlKey)}>
                {cell}
            </div>
        );
    }

    listToString(l1) {
        if (l1) {
            return l1.join(' ');
        }
    }
}

export { InitialCellData }
export default Cell