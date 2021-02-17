import { RESET_CLAIMS, SET_CLAIMS } from "../actions/actionTypes"

const initialState = {
    claims: [],
}

export const claimsReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_CLAIMS:
            return Object.assign({}, state, { claims: action.payload.claims })
        case RESET_CLAIMS:
            return Object.assign({}, state, initialState)
        default:
            return state;
    }
}