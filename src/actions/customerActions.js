import * as types from '../constants/ActionTypes';
import axios from 'axios';
import { returnErrors, deleteCustomerErrors } from './errorCustomerActions';
import { tokenConfig } from './authActions';
import { URL } from '../constants/ConfigURL';

export const getAllCustomer = () => (dispatch,getState) => {
    dispatch(setCustomersLoading());
    axios
        .get(`${URL}/api/customers`,tokenConfig(getState))
        .then(res =>
            dispatch({
                type: types.GET_ALL_CUSTOMER,
                payload: res.data
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status))
            })

}
export const addCustomer = (customer) => (dispatch, getState) => {
    console.log(customer)
    axios.post(`${URL}/api/customers`, customer, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: types.ADD_CUSTOMER,
                payload: res.data
            })).catch(err => {
                console.log(err.response.data)
                dispatch(returnErrors(err.response.data, err.response.status, 'ADD_CUSTOMER_FAIL'))
            })
}

export const clearAction = () => {
    return {
        type: types.CLEAR_ACTION_CUSTOMER
    }
}
export const deleteCustomer = (id) => (dispatch, getState) => {
    axios.delete(`${URL}/api/customers/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: types.DELETE_CUSTOMER,
                payload: id
            })).catch(err => {
                dispatch(deleteCustomerErrors(err.response.data, err.response.status))
            })
}

export const setCustomersLoading = () => {
    return {
        type: types.CUSTOMERS_LOADING
    }
}

export const searchCustomer = (keyword) => dispatch => {
    if (keyword === "") dispatch(getAllCustomer())
    else dispatch({
        type: types.SEARCH_CUSTOMER,
        keyword
    })
}
export const updateCustomer = (customer) => (dispatch, getState) => {
    var id = customer._id;
    axios.patch(`${URL}/api/customers/${id}`,customer, tokenConfig(getState))
        .then(res => 
            // dispatch({
            //     type: types.UPDATE_ORDER,
            //     payload: res.data
            // })
            console.log(res.data)
            ).catch(err => {
                console.log(err)
                //dispatch(updateErrors(err.response.data, err.response.status))
            })
}

//get Customer editting
export const getCustomerEditRequest = (id) => (dispatch, getState) => {
    axios.get(`${URL}/api/customers/${id}`, tokenConfig(getState))
        .then(res => {
            if (res.status === 200) {
                dispatch(getCustomerEdit(res.data))
            }
        }).catch(err => {
            console.log(err.response.data)
           // dispatch(updateErrors(err.response.data, err.response.status))
        })
}
export const getCustomerEdit = (payload) => {
    return {
        type: types.GET_CUSTOMER_EDIT,
        payload
    }
}
