import {FETCH_EVENTS} from './actionTypes'

const initialState = {
  allEvents: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        allEvents: action.allEvents
      }
    default:
      return state
  }
}