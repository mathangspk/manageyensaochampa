import * as types from '../constants/ActionTypes';
var initialState = {}
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PRODUCT_EDIT:
            state = action.payload
            return {
                ...state
            }
        default: return state;
    }
}
export default myReducer;