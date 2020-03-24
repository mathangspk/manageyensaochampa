import React, { Component } from 'react';
import CustomerModal from './CustomerModal';
import { Row } from 'reactstrap';
import Search from './Search';

class Control extends Component {
    render() {
        return (
            <div>
            <Row xs='2' className='mt-3'>
                <CustomerModal />
                <Search/>
            </Row>
            </div>
        );
    }
}

export default Control;