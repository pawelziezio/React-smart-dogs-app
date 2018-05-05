import {FETCH_PLACES} from './actionTypes'

export const fetchPlaces = () => dispatch => {
  fetch(
    process.env.PUBLIC_URL + '/data/places.json'
  ).then(function (response) {
    return response.json()
  }).then(function (placesArray) {
    dispatch({type: FETCH_PLACES, places: placesArray})
  }).catch(function (ex) {
    console.log('parsing failed')
  })
}



