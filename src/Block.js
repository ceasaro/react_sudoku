import * as React from 'react';
import Cell from './Cell';

class Block extends React.Component {
    render() {
        return (
            <div className="block">
                <div className="block-row">
                    <Cell {...this.getCellData(0,0)} handleCellClick={this.props.handleCellClick}  />
                    <Cell {...this.getCellData(0,1)} handleCellClick={this.props.handleCellClick} />
                    <Cell {...this.getCellData(0,2)} handleCellClick={this.props.handleCellClick} />
                </div>
                <div className="block-row">
                    <Cell {...this.getCellData(1,0)} handleCellClick={this.props.handleCellClick} />
                    <Cell {...this.getCellData(1,1)} handleCellClick={this.props.handleCellClick} />
                    <Cell {...this.getCellData(1,2)} handleCellClick={this.props.handleCellClick} />
                </div>
                <div className="block-row">
                    <Cell {...this.getCellData(2,0)} handleCellClick={this.props.handleCellClick} />
                    <Cell {...this.getCellData(2,1)} handleCellClick={this.props.handleCellClick} />
                    <Cell {...this.getCellData(2,2)} handleCellClick={this.props.handleCellClick} />
                </div>
            </div>
        );
    }

    getCellData(cellX, cellY) {
        if (this.props.data) {
            return this.props.data[cellX][cellY]
        }
    }
}

export default Block