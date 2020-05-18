import * as React from 'react';
import Block from './Block';
import Row from 'react-bootstrap/Row';

let sudoku = [[]];

class SudokuGame extends React.Component {
    render() {
        return (
            <Row>
                <div className="sudoku">
                    <div className="sudoku-row">
                        <Block></Block>
                        <Block></Block>
                        <Block></Block>
                    </div>
                    <div className="sudoku-row">
                        <Block></Block>
                        <Block></Block>
                        <Block></Block>
                    </div>
                    <div className="sudoku-row">
                        <Block></Block>
                        <Block></Block>
                        <Block></Block>
                    </div>
                </div>
            </Row>
        )
    }
}

export default SudokuGame