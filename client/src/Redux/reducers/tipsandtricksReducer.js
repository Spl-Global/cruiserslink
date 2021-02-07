import { SET_TIPS_AND_TRICKS, RESET_TIPS_AND_TRICKS } from '../actions/actionTypes'
const initialState = {
    tipsandtricks: [],
}
export const tipsandtricksReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_TIPS_AND_TRICKS:
            return Object.assign({}, state, { tipsandtricks: action.payload.tipsandtricks })
        case RESET_TIPS_AND_TRICKS:
            return Object.assign({}, state, initialState)
        default:
            return state;
    }
}