import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Control from '../Order/Control/Control';
import OrderListContainer from '../../containers/OrderListContainer';

class HomePage extends Component {
    render() {
        return (
                <Container>
                    <Control />
                    <OrderListContainer />
                </Container>
        );
    }
}

export default HomePage;