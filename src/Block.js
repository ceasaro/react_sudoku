import * as React from 'react';
import Row from 'react-bootstrap/Row';
import Cell from './Cell';
import Col from 'react-bootstrap/Col';

class Block extends React.Component {
    render() {
        return (
            <div className="block">
                <div className="block-row">
                    <Cell></Cell>
                    <Cell></Cell>
                    <Cell></Cell>
                </div>
                <div className="block-row">
                    <Cell></Cell>
                    <Cell></Cell>
                    <Cell></Cell>
                </div>
                <div className="block-row">
                    <Cell></Cell>
                    <Cell></Cell>
                    <Cell></Cell>
                </div>
            </div>
        );
    }
}

export default Block