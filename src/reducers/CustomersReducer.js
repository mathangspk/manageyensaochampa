import * as types from '../constants/ActionTypes';
import { filter, findIndex } from 'lodash'
var initialState = {
    customers: [],
    loading: false,
    isCreateSuccess: false
}
var myReducer = (state = initialState, action) => {
    var index = '';
    switch (action.type) {
        
        case types.GET_ALL_CUSTOMER:
            return {
                ...state,
                customers: action.payload,
                loading: false
            }
        case types.ADD_CUSTOMER:
            console.log(action)
            return {
                ...state,
                customers: [action.payload, ...state.customers],
                isCreateSuccess: true
            }
        case types.DELETE_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers.filter(customer => customer._id !== action.payload)]
            }
        case types.CUSTOMERS_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.CLEAR_ACTION_CUSTOMER:
            return {
                ...state,
                isCreateSuccess: false
            }
        case types.SEARCH_CUSTOMER:
            var keyword = action.keyword;
            var customers = filter(state.customers, (customer) => {
                return customer.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            })
            return {
                ...state,
                customers: customers
            }
        case types.UPDATE_CUSTOMER:
            //edit
            var editOrder = action.payload
            index = findIndex(state.customers, (customer) => {
                return customer._id === editOrder._id
            })
            state.customers[index] = editOrder;
            return state;
        default: return state;
    }
}
export default myReducer;