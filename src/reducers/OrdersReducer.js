import * as types from '../constants/ActionTypes';
import { findIndex } from 'lodash'
var initialState = {
    orders: [],
    loading: false,
    isCreateSuccess: false
}
var myReducer = (state = initialState, action) => {
    var index = '';
    switch (action.type) {
        
        case types.LIST_ALL:
            return {
                ...state,
                orders: action.payload,
                loading: false
            }
        case types.ADD_ORDER:
            console.log(action)
            return {
                ...state,
                orders: [action.payload, ...state.orders],
                isCreateSuccess: true
            }
        case types.DELETE_ORDER:
            return {
                ...state,
                orders: [...state.orders.filter(order => order._id !== action.payload)]
            }
        case types.ORDERS_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.CLEAR_ACTION:
            return {
                ...state,
                isCreateSuccess: false
            }
        case types.UPDATE_ORDER:
            //edit
            var editOrder = action.payload
            index = findIndex(state.orders, (order) => {
                return order._id === editOrder._id
            })
            state.orders[index] = editOrder;
            return state;
        default: return state;
    }
}
export default myReducer;