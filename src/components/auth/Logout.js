import React, { Component } from 'react';
import * as actions from '../../actions/authActions';
import  {connect} from 'react-redux';
import { NavLink } from 'reactstrap';
class Logout extends Component {
    onLogout = () => {
        this.props.logout();
        console.log('logout clicked')
    }
    render() {
        return (
                <NavLink onClick = {this.onLogout} href="#">Logout</NavLink>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => {
            dispatch(actions.logout())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Logout);