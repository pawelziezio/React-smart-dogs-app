import {FETCH_PLACES} from './actionTypes'

const initialState = {
  places: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES:
      return {
        ...state,
        places: action.places
      }
    default:
      return state
  }
}



