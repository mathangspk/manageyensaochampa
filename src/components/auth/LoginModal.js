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

class LoginModal extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    state = {
        modal: false,
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
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        //action register
        this.props.login(user)
        //this.toggle();
    }

    componentDidUpdate(nextprops) {
        const { error, isAuthenticated } = this.props;
        if (error !== nextprops.error) {
            if (error.id === 'LOGIN_FAIL') {
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
                    href="#"
                    onClick={this.toggle}
                >Login</NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >Login
                    </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
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
                                >Login</Button>
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
        login: (user) => {
            dispatch(actions.login(user))
        },
        clearErrors: () => {
            dispatch(errorActions.clearErrors())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
