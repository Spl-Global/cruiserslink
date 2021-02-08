import { SET_USERS, RESET_USERS } from '../actions/actionTypes'
const initialState = {
    users: [],
    pageToken: null,
}
export const usersReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_USERS:
            return Object.assign({}, state, { users: action.payload.users, pageToken: action.payload.pageToken })
        case RESET_USERS:
            return Object.assign({}, state, initialState)
        default:
            return state
    }
}