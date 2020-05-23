import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SudokuGame from './SudokuGame';
import { SudokuData } from './puzzle_data';

function App() {
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Sudoku tool</h1>
                </Col>
            </Row>
            <SudokuGame data={SudokuData}/>
        </Container>
    );
}

export default App;
