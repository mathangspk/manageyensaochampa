import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    // Alert,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions/customerActions';

class ActionCustomerPage extends Component {

    state = {
        modal: false,
        _id: '',
        name:'',
        address: '',
        facebook: '',
        phoneNumber: 0,
        msg: ''
    }

    componentDidMount() {
        var { params } = this.props
        if (params !== null) { //update
            var { id } = this.props.match.params
            if (id) {
                this.props.getCustomerEditing(id);
            }
        }
    }

    componentDidUpdate(nextprops) {
        const { customerEditting } = this.props;
        if (customerEditting !== nextprops.customerEditting) {
            this.setState({
                _id: customerEditting._id,
                name: customerEditting.name,
                address: customerEditting.address,
                facebook: customerEditting.facebook,
                quantity: customerEditting.quantity,
                phoneNumber: customerEditting.phoneNumber
            })
        }

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        const customer = {
            _id: this.state._id,
            name: this.state.name,
            address: this.state.address,
            facebook: this.state.facebook,
            phoneNumber: this.state.phoneNumber,
        }
        //action update Customer
        this.props.updateCustomer(customer)
        this.props.history.goBack();
    }

    render() {

        var { name, address, facebook, phoneNumber } = this.state;

        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                <InputGroup className='mb-3'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Tên khách hàng</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={this.onChange}
                        ></Input>
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Địa chỉ</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Địa chỉ"
                            value={address}
                            onChange={this.onChange}
                        ></Input>
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Facebook</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="text"
                            name="facebook"
                            id="facebook"
                            value={facebook}
                            onChange={this.onChange}
                        >
                        </Input>
                    </InputGroup>
                    <Label for="customer">
                        Số điện thoại: 
                    </Label>
                    <Input
                        type="number"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={this.onChange}
                        className='mb-3'
                    ></Input>
                    <Button
                        type="submit"
                        color="dark"
                        block
                        style={{ marginBottom: '2rem' }}
                        onClick={this.onSubmit}
                    >Cập nhật khách hàng</Button>
                </FormGroup>
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addNewCustomer: (newCustomer) => {
            dispatch(actions.addCustomer(newCustomer))
        },
        clearAction: () => {
            dispatch(actions.clearAction())
        },
        getCustomerEditing: (id) => {
            dispatch(actions.getCustomerEditRequest(id))
        },
        updateCustomer: (customer) => {
            dispatch(actions.updateCustomer(customer))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        customerEditting: state.customerEditting,
        isAuthenticated: state.auth.isAuthenticated,
        errorCustomer: state.errorCustomer,
        isCreateSuccess: state.customers.isCreateSuccess,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ActionCustomerPage);
