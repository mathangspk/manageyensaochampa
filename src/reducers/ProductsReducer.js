import * as types from '../constants/ActionTypes';
import { filter } from 'lodash'
var initialState = {
    products: [],
    loading: false,
    isCreateSuccess: false,
    productSelected: []
}
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_PRODUCT:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case types.ADD_PRODUCT:
            return {
                ...state,
                products: [action.payload, ...state.products],
                isCreateSuccess: true
            }
        case types.DELETE_PRODUCT:
            return {
                ...state,
                products: [...state.products.filter(product => product._id !== action.payload)]
            }
        case types.PRODUCT_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.CLEAR_ACTION_PRODUCT:
            return {
                ...state,
                isCreateSuccess: false
            }
        case types.SEARCH_PRODUCT:
            var keyword = action.keyword;
            var products = filter(state.products, (product) => {
                return product.title.indexOf(keyword) !== -1;
            })
            return {
                ...state,
                products: products
            }
        case types.GET_PRICE_FROM_PRODUCT:
            var pSelected = action.productSelected;
            var productSelected = filter(state.products, (product) =>{   //trả về mảng có giá trị product bằng select
                return product.title.indexOf(pSelected) !== -1;
            })
            return {
                ...state,
                productSelected: productSelected
            }
        default: return state;
    }
}
export default myReducer;