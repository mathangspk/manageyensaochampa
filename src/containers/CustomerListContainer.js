import React, { Component, Fragment } from 'react';
import CustomersList from '../components/Customer/CustomersList';
import { connect } from 'react-redux';
import * as actions from '../actions/customerActions';
import CustomerItem from '../components/Customer/CustomerItem';
import PropTypes from 'prop-types';
class CustomerListContainer extends Component {

    UNSAFE_componentWillMount() {
        this.props.getAllCustomer();
    }

    render() {
        var { customers } = this.props;
        return (
            <Fragment>
                <CustomersList>
                    {this.showCustomers(customers)}
                </CustomersList>
            </Fragment>
        );
    }

    showCustomers = (customers) => {
        var result = null;
        var {deleteCustomer} = this.props;
        if (customers.length > 0) {
            result = customers.map((customer, index) => {
                return <CustomerItem
                    key={index}
                    customer={customer}
                    index={index}
                    deleteCustomer={deleteCustomer}
                />
            })
        }
        return result;
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        customers: state.customers.customers
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllCustomer: () => {
            dispatch(actions.getAllCustomer())
        },
        deleteCustomer: (_id) => {
            dispatch(actions.deleteCustomer(_id))
        }
    }
}
CustomerListContainer.propTypes = {
    deleteCustomer: PropTypes.func.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerListContainer);