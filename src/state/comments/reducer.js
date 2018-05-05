import {FETCH_COMMENTS__BEGIN, FETCH_COMMENTS__END,
  SUBMIT_COMMENTS__BEGIN, SUBMIT_COMMENTS__END} from './actionTypes'

const initialState = {
  comments: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case FETCH_COMMENTS__END:
      return {
        ...state,
        comments: action.comments
      }

    case SUBMIT_COMMENTS__END:
      return {
        ...state,
        title: action.title,
        content: action.content,
        authorName: action.authorName
      }

    default:
      return state
  }
}