import * as types from '../constants/ActionTypes';
var initialState = {}
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_ORDER:
            console.log(action)
            state = action.keyword
            return state
        default: return state;
    }
}
export default myReducer;