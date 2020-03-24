import * as types from '../constants/ActionTypes'

//return errors
export const returnErrors = (msg, status, id = null) => {
    return {
        type: types.ADD_PRODUCT_ERRORS,
        payload: { msg, status, id }
    }
}
export const deleteProductErrors = (msg, status, id = null) => {
    return {
        type: types.DELETE_PRODUCT_ERRORS,
        payload: { msg, status, id }
    }
}

export const clearErrors = () => {
    return {
        type: types.CLEAR_PRODUCT_ERRORS
    }
}