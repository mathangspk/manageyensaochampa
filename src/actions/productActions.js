import * as types from '../constants/ActionTypes';
import axios from 'axios';
import { returnErrors, deleteProductErrors } from './errorProductActions';
import { tokenConfig } from './authActions';
import { URL } from '../constants/ConfigURL';

export const getAllProduct = () => (dispatch,getState) => {
    dispatch(setProductsLoading());
    axios
        .get(`${URL}/api/products`,tokenConfig(getState))
        .then(res =>
            dispatch({
                type: types.GET_ALL_PRODUCT,
                payload: res.data
            }))
            // })).catch(err => {
            //     dispatch(returnErrors(err.response.data, err.response.status))
            // })

}
export const addProduct = (product) => (dispatch, getState) => {
    console.log(product)
    axios.post(`${URL}/api/products`, product, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: types.ADD_PRODUCT,
                payload: res.data
            })).catch(err => {
                console.log(err.response.data)
                dispatch(returnErrors(err.response.data, err.response.status, 'ADD_PRODUCT_FAIL'))
            })
}

export const clearAction = () => {
    return {
        type: types.CLEAR_ACTION_PRODUCT
    }
}
export const deleteProduct = (id) => (dispatch, getState) => {
    axios.delete(`${URL}/api/products/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: types.DELETE_PRODUCT,
                payload: id
            })).catch(err => {
                dispatch(deleteProductErrors(err.response.data, err.response.status))
            })
}

export const setProductsLoading = () => {
    return {
        type: types.PRODUCT_LOADING
    }
}

export const searchProduct = (keyword) => dispatch => {
    console.log(keyword)
    if (keyword === "") dispatch(getAllProduct())
    else dispatch({
        type: types.SEARCH_PRODUCT,
        keyword
    })
}



export const updateProduct = (product) => (dispatch, getState) => {
    var id = product._id;
    axios.patch(`${URL}/api/products/${id}`,product, tokenConfig(getState))
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

//get Product editting
export const getProductEditRequest = (id) => (dispatch, getState) => {
    axios.get(`${URL}/api/products/${id}`, tokenConfig(getState))
        .then(res => {
            if (res.status === 200) {
                console.log(res.data)
                dispatch(getProductEdit(res.data))
            }
        }).catch(err => {
            console.log(err.response.data)
           // dispatch(updateErrors(err.response.data, err.response.status))
        })
}
export const getProductEdit = (payload) => {
    return {
        type: types.GET_PRODUCT_EDIT,
        payload
    }
}

export const getPriceFromProduct = (productSelected) => {
    return {
        type: types.GET_PRICE_FROM_PRODUCT,
        productSelected
    }
}