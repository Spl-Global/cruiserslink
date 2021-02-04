import * as actions from './actionTypes'

export const SetUsers = function (users) {
    return { type: actions.SET_USERS, payload: { users } }
}
export const ResetUsers = function () {
    return { type: actions.RESET_USERS }
}

export const SetServices = function (services) {
    return { type: actions.SET_SERVICES, payload: { services } }
}
export const ResetServices = function () {
    return { type: actions.RESET_SERVICES }
}