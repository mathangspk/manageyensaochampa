import { ADD_CUSTOMER_ERRORS, CLEAR_CUSTOMER_ERRORS } from '../constants/ActionTypes'

const initialState = {
    msg: {},
    status: null,
    id: null
}
export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_CUSTOMER_ERRORS:
            console.log(action)
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            }
        case CLEAR_CUSTOMER_ERRORS:
            return {
                msg: {},
                status: null,
                id: null
            }
        default: return state;
    }
}