import orders from './OrdersReducer';
import products from './ProductsReducer';
import customers from './CustomersReducer';

import authReducer from './authReducer';
import {combineReducers} from 'redux';

import errorOrderReducer from './errorOrderReducer';
import errorProductReducer from './errorProductReducer';
import errorCustomerReducer from './errorCustomerReducer';
import errorReducer from './errorReducer';

import orderEditting from './orderEditting';
import productEditting from './productEditting';
import customerEditting from './customerEditting';
import searchOrder from './searchOrder';
const myReducer = combineReducers({
    auth: authReducer,
    orders,
    products,
    customers,    
    keywordSearchOrder: searchOrder,


    errorProduct: errorProductReducer,
    error: errorReducer,
    errorOrder: errorOrderReducer,
    errorCustomer: errorCustomerReducer,

    orderEditting,
    productEditting,
    customerEditting,
   
})

export default myReducer;