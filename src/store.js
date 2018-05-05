import {compose, createStore, combineReducers, applyMiddleware} from 'redux'
import persistState from 'redux-localstorage'
import thunkMiddleware from 'redux-thunk'

import {reducer as favoritesEventsReducer} from './FavoritesToggleButton'
import allEventsReducer from './state/events/reducer'
import placesReducer  from './state/places/reducer'
import commentsReducer from './state/comments/reducer'

const reducer = combineReducers({
  allEventsData: allEventsReducer,
  placesData: placesReducer,
  favoritesData: favoritesEventsReducer,
  commentsData: commentsReducer

})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunkMiddleware
  ),
  persistState(['favoritesData'] ['comments'], {key: 'smartdogs-v1'})
)

const store = createStore(reducer, enhancer);


export default store



