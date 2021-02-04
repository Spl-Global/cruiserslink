import { combineReducers } from 'redux'
import { usersReducer } from './usersReducer'
import { servicesReducer } from './servicesReducer'

const rootReducer = combineReducers({
    usersReducer,
    servicesReducer
})
export default rootReducer