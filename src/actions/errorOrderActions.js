import * as types from '../constants/ActionTypes'

//return errors
export const returnErrors = (msg, status, id = null) => {
    return {
        type: types.ADD_ORDER_ERRORS,
        payload: { msg, status, id }
    }
}

export const updateErrors = (msg, status, id = null) => {
    return {
        type: types.UPDATE_ORDER_ERRORS,
        payload: { msg, status, id }
    }
}

export const clearErrors = () => {
    return {
        type: types.CLEAR_ORDER_ERRORS
    }
}