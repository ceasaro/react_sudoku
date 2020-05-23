import * as React from 'react';
import Block from './Block';
import { validate } from './gameUtils';
import { InitialCellData } from './Cell';
import Row from 'react-bootstrap/Row';
import { forEach } from 'react-bootstrap/cjs/ElementChildren';

function initializeData(data) {
    let gameData = [];
    data.forEach(function(row, x) {
        gameData[x] = []
        row.forEach(function(given, y) {
            let data = { ...InitialCellData }
            data.given = validate(given);
            data.x = x
            data.y = y
            gameData[x][y] = data
        })
    })
    return gameData;
}

class SudokuGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameData: initializeData(props.data),
            activeX: null,
            activeY: null,
        };
    }

    componentDidMount() {
        document.addEventListener("keydown", this.keyPressed.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyPressed.bind(this), false);
    }

    handleCellClick(x, y, ctrlKey) {
        let gameData = this.state.gameData;
        let sudokuGame = this;
        if (ctrlKey) {
            this.updateCell(x, y, { selected: true })
        } else {
            gameData.forEach(function(row, x) {
                row.forEach(function(given, y) {
                    sudokuGame.updateCell(x, y, { editable: false })
                })
            });
            if (!gameData[x][y].given) {
                this.setState({'activeX': x, 'activeY': y})
                sudokuGame.updateCell(x, y, { editable: true })
            }
        }
    }

    keyPressed(e) {
        let keyCode = e.keyCode;
        if (e.keyCode >= 97 && e.keyCode <= 105) {
            // correct pressed keypad number keys
            keyCode = e.keyCode - 48;
        }
        if (keyCode >= 49 && keyCode <= 57) {
            this.setNumber(Number.parseInt(String.fromCharCode(keyCode)))
        }
    }

    render() {
        return (
            <Row>
                <div className="sudoku">
                    <div className="sudoku-row">
                        <Block data={this.getBlockData(0, 0)}
                               handleCellClick={this.handleCellClick.bind(this)} />
                        <Block data={this.getBlockData(0, 1)} handleCellClick={this.handleCellClick.bind(this)} />
                        <Block data={this.getBlockData(0, 2)} handleCellClick={this.handleCellClick.bind(this)} />
                    </div>
                    <div className="sudoku-row">
                        <Block data={this.getBlockData(1, 0)} handleCellClick={this.handleCellClick.bind(this)} />
                        <Block data={this.getBlockData(1, 1)} handleCellClick={this.handleCellClick.bind(this)} />
                        <Block data={this.getBlockData(1, 2)} handleCellClick={this.handleCellClick.bind(this)} />
                    </div>
                    <div className="sudoku-row">
                        <Block data={this.getBlockData(2, 0)} handleCellClick={this.handleCellClick.bind(this)} />
                        <Block data={this.getBlockData(2, 1)} handleCellClick={this.handleCellClick.bind(this)} />
                        <Block data={this.getBlockData(2, 2)} handleCellClick={this.handleCellClick.bind(this)} />
                    </div>
                </div>
            </Row>
        )
    }

    setNumber(number) {
        let x = this.state.activeX;
        let y = this.state.activeY;
        this.updateCell(x,y, {'number': null})
        let numbers = this.getInvalidNumbers(x, y);
        console.log(numbers);
        this.updateCell(x,y, {'number': number, 'faulty': numbers.has(number)})
    }
    updateCell(x, y, newData) {
        this.setState(state => {
            const gameData = state.gameData.map((row, _x) => {
                if (x === _x) {
                    return row.map((cellData, _y) => {
                        if (y === _y) {
                            return { ...cellData, ...newData }
                        } else {
                            return cellData
                        }
                    });
                } else {
                    return row;
                }
            });

            return { gameData, };
        });
    }

    getBlockData(blockX, blockY) {
        let row = blockX * 3;
        let col = blockY * 3;
        if (this.state.gameData) {
            return [
                [
                    this.state.gameData[row][col],
                    this.state.gameData[row][col + 1],
                    this.state.gameData[row][col + 2],
                ],
                [
                    this.state.gameData[row + 1][col],
                    this.state.gameData[row + 1][col + 1],
                    this.state.gameData[row + 1][col + 2],
                ],
                [
                    this.state.gameData[row + 2][col],
                    this.state.gameData[row + 2][col + 1],
                    this.state.gameData[row + 2][col + 2],
                ]
            ]
        }
    }

    getInvalidNumbers(x, y) {
        return new Set([...this.getRowNumbers(x), ...this.getColumnNumbers(y), ...this.getBlockNumbers(x, y)])
    }

    getRowNumbers(rowIndex) {
        let numbers = new Set();
        this.state.gameData[rowIndex].forEach(function(cellData) {
            let number = cellData.given || cellData.number;
            if (validate(number)) {
                numbers.add(number)
            }
        })
        return numbers;
    }

    getColumnNumbers(colIndex) {
        let numbers = new Set();
        this.state.gameData.forEach(function(rowData) {
            let number = rowData[colIndex].given || rowData[colIndex].number;
            if (validate(number)) {
                numbers.add(number)
            }
        })
        return numbers;
    }

    getBlockNumbers(x, y) {
        let numbers = new Set();
        let blockX = Math.round(x/3);
        let blockY = Math.round(y/3);
        for (let x=blockX; x<blockX+3; x++) {
            for (let y=blockY; y<blockY+3; y++) {
                let cellData = this.state.gameData[x][y]
                let number = cellData.given || cellData.number;
                if (validate(number)) {
                    numbers.add(number);
                }
            }
        }
        return numbers;
    }
}

export default SudokuGame