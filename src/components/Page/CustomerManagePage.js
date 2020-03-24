import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Control from '../Customer/Control/Control';
import CustomerListContainer from '../../containers/CustomerListContainer';

class CustomerManagePage extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Control/>
                    <CustomerListContainer/>
                </Container>
            </div>
        );
    }
}

export default CustomerManagePage;