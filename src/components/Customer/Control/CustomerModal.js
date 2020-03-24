import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Input,
    Alert,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../actions/customerActions';
class CustomerModal extends Component {
    state = {
        modal: false,
        name: '',
        address: '',
        phoneNumber: '',
        facebook: '',
        msg: ''
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
        this.clearState()
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newCustomer = {
            name: this.state.name,
            address: this.state.address,
            facebook: this.state.facebook,
            phoneNumber: this.state.phoneNumber

        }

        //add customer via addcustomer action
        this.props.addNewCustomer(newCustomer);
        //this.toggle();
    }

    clearState = () => {
        this.setState({
            name: "",
            address: '',
            facebook: '',
            phoneNumber: "",
            msg: ''
        })
    }


    componentDidUpdate(nextprops) {
        const { errorCustomer, isCreateSuccess } = this.props;
        if (errorCustomer !== nextprops.errorCustomer) {
            console.log(errorCustomer.msg)
            if (errorCustomer.id === 'ADD_CUSTOMER_FAIL') {
                this.setState({ msg: errorCustomer.msg })
            } else {
                this.setState({ msg: null })
            }
        }
        if (isCreateSuccess) {
            console.log('close')
            this.toggle();
            this.props.clearAction();
        }
    }

    render() {
        var { isAuthenticated } = this.props;
        var { name, address, facebook, phoneNumber, msg} = this.state;
        return (
            <div>
                {isAuthenticated ? (<Button
                    color='dark'
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >Add Customer</Button>) : <h4>Please login to add Customer</h4>}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >Tạo khách hàng mới
                    </ModalHeader>
                    <ModalBody>
                        {msg ? (<Alert color="danger">{msg}</Alert>) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <InputGroup className='mb-3'>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Tên</InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="name"
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
                                <InputGroup className='mb-3'>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Phone Number</InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="number"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        value={phoneNumber}
                                        onChange={this.onChange}
                                    >
                                    </Input>
                                </InputGroup>
                                <Button
                                    type="submit"
                                    color="dark"
                                    block
                                    style={{ marginBottom: '2rem' }}
                                    onClick={this.onSubmit}
                                >Thêm khách hàng</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addNewCustomer: (newCustomer) => {
            dispatch(actions.addCustomer(newCustomer))
        },
        clearAction: () => {
            dispatch(actions.clearAction())
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        customers: state.customers,
        isAuthenticated: state.auth.isAuthenticated,
        errorCustomer: state.errorCustomer,
        isCreateSuccess: state.customers.isCreateSuccess
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerModal);
