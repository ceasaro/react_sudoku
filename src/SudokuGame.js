import * as React from 'react';
import Block from './Block';
import { validate } from './gameUtils';
import { InitialCellData } from './Cell';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import cloneDeep from 'lodash/cloneDeep';
import { Button } from 'react-bootstrap';

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
            showAllOptions: false,
        };
    }

    componentDidMount() {
        document.addEventListener("keydown", this.keyPressed.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyPressed.bind(this), false);
    }

    handleCellClick(event, x, y) {
        let gameData = this.state.gameData;
        let sudokuGame = this;
        if (event.ctrlKey && event.shiftKey) {

        } else if (event.ctrlKey) {
            this.updateCell(x, y, { selected: !this.state.gameData[x][y].selected })
        } else {
            gameData.forEach(function(row, x) {
                row.forEach(function(given, y) {
                    sudokuGame.updateCell(x, y, { editable: false })
                })
            });
            if (!gameData[x][y].given) {
                this.setState({ 'activeX': x, 'activeY': y })
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
        if (keyCode === 8 || keyCode === 46) {
            // clear input
            this.setNumber(null);
        }
    }

    toggleShowOptions() {
        let newShowAllOptions = !this.state.showAllOptions;
        this.setState({ showAllOptions: newShowAllOptions });
        if (newShowAllOptions) {
            this.updatePossibleNumbers();
        } else {
            this.clearPossibleNumbers();
        }
    }

    toggleAutoFill() {
        this.updatePossibleNumbers({autoFill: true});
    }

    render() {
        return (
            <Row>
                <Col xs={10}>
                    <Row>
                        <div className="sudoku">
                            <div className="sudoku-row">
                                <Block data={this.getBlockData(0, 0)}
                                       handleCellClick={this.handleCellClick.bind(this)} />
                                <Block data={this.getBlockData(0, 1)}
                                       handleCellClick={this.handleCellClick.bind(this)} />
                                <Block data={this.getBlockData(0, 2)}
                                       handleCellClick={this.handleCellClick.bind(this)} />
                            </div>
                            <div className="sudoku-row">
                                <Block data={this.getBlockData(1, 0)}
                                       handleCellClick={this.handleCellClick.bind(this)} />
                                <Block data={this.getBlockData(1, 1)}
                                       handleCellClick={this.handleCellClick.bind(this)} />
                                <Block data={this.getBlockData(1, 2)}
                                       handleCellClick={this.handleCellClick.bind(this)} />
                            </div>
                            <div className="sudoku-row">
                                <Block data={this.getBlockData(2, 0)}
                                       handleCellClick={this.handleCellClick.bind(this)} />
                                <Block data={this.getBlockData(2, 1)}
                                       handleCellClick={this.handleCellClick.bind(this)} />
                                <Block data={this.getBlockData(2, 2)}
                                       handleCellClick={this.handleCellClick.bind(this)} />
                            </div>
                        </div>
                    </Row>
                </Col>
                <Col>
                    <h3>Menu</h3>
                    <Button variant="outline-danger" block active={this.state.showAllOptions}
                            onClick={(e) => this.toggleShowOptions()}>Show options</Button>
                    <Button variant="outline-danger" block disabled={!this.state.showAllOptions}
                            onClick={(e) => this.toggleAutoFill()}>Auto fill</Button>
                </Col>
            </Row>
        )
    }

    setNumber(number) {
        let x = this.state.activeX;
        let y = this.state.activeY;
        this.updateCell(x, y, { 'number': null })
        let numbers = this.getInvalidNumbers(x, y);
        this.updateCell(x, y, { 'number': number, 'faulty': numbers.has(number) })
        if (this.state.showAllOptions) {
            this.updatePossibleNumbers();
        }
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
        let blockX = Math.floor(x / 3) * 3;
        let blockY = Math.floor(y / 3) * 3;
        for (let _x = blockX; _x < blockX + 3; _x++) {
            for (let _y = blockY; _y < blockY + 3; _y++) {
                let cellData = this.state.gameData[_x][_y];
                let number = cellData.given || cellData.number;
                if (validate(number)) {
                    numbers.add(number);
                }
            }
        }
        return numbers;
    }

    updatePossibleNumbers(options) {
        let _options = { ...{ autoFill: false }, ...options };
        let sudokuGame = this;
        let newGameData = cloneDeep(this.state.gameData);
        newGameData.forEach(function(rowData) {
            rowData.forEach(function(cell) {
                if (!cell.given && !cell.number) {
                    let invalidNumbers = sudokuGame.getInvalidNumbers(cell.x, cell.y);
                    cell.possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(x => !invalidNumbers.has(x))
                    if (_options.autoFill && cell.possibleNumbers.length === 1) {
                        cell.number = cell.possibleNumbers[0];
                    }
                }
            })
        })
        this.setState({ 'gameData': newGameData })
    }

    clearPossibleNumbers() {
        let newGameData = cloneDeep(this.state.gameData);
        newGameData.forEach(function(rowData) {
            rowData.forEach(function(cell) {
                cell.possibleNumbers = []
            })
        })
        this.setState({ 'gameData': newGameData })
    }
}

export default SudokuGame