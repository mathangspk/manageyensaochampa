import React, { Component } from 'react';
import ProductModal from './ProductModal';
import { Row } from 'reactstrap';
import Search from './Search';

class Control extends Component {
    render() {
        return (
            <div>
            <Row xs='2' className='mt-3'>
                <ProductModal />
                <Search/>
            </Row>
            </div>
        );
    }
}

export default Control;