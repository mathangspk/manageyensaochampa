import * as types from '../constants/ActionTypes';
import axios from 'axios';
import { returnErrors, updateErrors } from './errorOrderActions';
import { tokenConfig } from './authActions';
import { URL } from '../constants/ConfigURL';

export const listAll = () => (dispatch, getState) => {
    dispatch(setOrdersLoading());
    axios
        .get(`${URL}/api/orders`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: types.LIST_ALL,
                payload: res.data
            })).catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status))
            })

}
export const addOrder = (order) => (dispatch, getState) => {
    console.log(order)
    axios.post(`${URL}/api/orders`, order, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: types.ADD_ORDER,
                payload: res.data
            })).catch(err => {
                console.log(err.response.data)
                dispatch(returnErrors(err.response.data, err.response.status, 'ADD_ORDER_FAIL'))
            })
}

export const clearAction = () => {
    return {
        type: types.CLEAR_ACTION
    }
}
export const deleteOrder = (id) => (dispatch, getState) => {
    axios.delete(`${URL}/api/orders/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: types.DELETE_ORDER,
                payload: id
            })).catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status))
            })
}


export const updateOrder = (order) => (dispatch, getState) => {
    var id = order._id;
    console.log(order)
    axios.patch(`${URL}/api/orders/${id}`,order, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: types.UPDATE_ORDER,
                payload: order
            })
            ).catch(err => {
                //console.log(err)
                 dispatch(updateErrors(err.response.data, err.response.status, 'UPDATE_ERROR'))
            })
}

export const setOrdersLoading = () => {
    return {
        type: types.ORDERS_LOADING
    }
}

export const searchOrder = (keyword) => dispatch => {
    if (keyword === "") dispatch(listAll())
    else dispatch({
        type: types.SEARCH_ORDER,
        keyword
    })
}
//get Order editting
export const getOrderEditRequest = (id) => (dispatch, getState) => {
    axios.get(`${URL}/api/orders/${id}`, tokenConfig(getState))
        .then(res => {
            if (res.status === 200) {
                console.log(res.data)
                dispatch(getOrderEdit(res.data))
            }
        }).catch(err => {
            dispatch(updateErrors(err.response.data, err.response.status))
        })
}
export const getOrderEdit = (payload) => {
    return {
        type: types.GET_ORDER_EDIT,
        payload
    }
}

