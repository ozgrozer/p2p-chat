import {combineReducers} from 'redux'
import personsReducer from './personsReducer'

const reducers = combineReducers({
  persons: personsReducer
})

export default reducers
