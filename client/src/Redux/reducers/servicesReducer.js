import { SET_SERVICES, RESET_SERVICES } from '../actions/actionTypes'
const initialState = {
    services: [],
    meta: {},
}
export const servicesReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_SERVICES:
            return Object.assign({}, state, { services: action.payload.services })
        case RESET_SERVICES:
            return Object.assign({}, state, initialState)
        default:
            return state
    }
}