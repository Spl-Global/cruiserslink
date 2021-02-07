import { SET_FEEDBACK_AND_RATINGS, RESET_FEEDBACK_AND_RATINGS } from '../actions/actionTypes'
const initialState = {
    rating_and_feedbacks: [],
}
export const ratingsandfeedbackReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_FEEDBACK_AND_RATINGS:
            return Object.assign({}, state, { rating_and_feedbacks: action.payload.rating_and_feedbacks })
        case RESET_FEEDBACK_AND_RATINGS:
            return Object.assign({}, state, initialState)
        default:
            return state;
    }
}