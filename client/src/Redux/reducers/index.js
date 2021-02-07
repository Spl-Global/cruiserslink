import { combineReducers } from 'redux'
import { usersReducer } from './usersReducer'
import { servicesReducer } from './servicesReducer'
import { tipsandtricksReducer } from './tipsandtricksReducer'
import { ratingsandfeedbackReducer } from './ratingsandfeedbackReducer'
const rootReducer = combineReducers({
    usersReducer,
    servicesReducer,
    tipsandtricksReducer,
    ratingsandfeedbackReducer
})
export default rootReducer