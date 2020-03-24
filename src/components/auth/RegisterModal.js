import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions/authActions';
import * as errorActions from '../../actions/errorActions';
import PropTypes from 'prop-types';

class RegisterModal extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired

    }
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }
    toggle = () => {
        //clear Errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        //action register
        this.props.register(newUser)
        //this.toggle();
    }

    componentDidUpdate(nextprops) {
        const { error, isAuthenticated } = this.props;
        if (error !== nextprops.error) {
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg })
            } else {
                this.setState({ msg: null })
            }
        }
        //if authenticated, close the modal
        if(this.state.modal){ 
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    render() {
        return (
            <div>
                <NavLink
                    onClick={this.toggle}
                >Register</NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >Register
                    </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">
                                    Name
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="name"
                                    onChange={this.onChange}
                                    className="mb-3"
                                ></Input>
                                <Label for="email">
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="email"
                                    onChange={this.onChange}
                                    className="mb-3"
                                ></Input>
                                <Label for="password">
                                    password
                                </Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                    onChange={this.onChange}
                                    className="mb-3"
                                ></Input>
                                <Button
                                    type="submit"
                                    color="dark"
                                    style={{ marginBottom: '2rem' }}
                                    onClick={this.onSubmit}
                                >Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        register: (newUser) => {
            dispatch(actions.register(newUser))
        },
        clearErrors: () => {
            dispatch(errorActions.clearErrors())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
