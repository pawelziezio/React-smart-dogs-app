import { FETCH_EVENTS } from './actionTypes'

export const fetchEvents = () => dispatch => {

  fetch(
    process.env.PUBLIC_URL + '/data/events.json'
  ).then(function (response) {
    return response.json()
  }).then(function (eventsArray) {
    dispatch({type: FETCH_EVENTS, allEvents: eventsArray})
  }).catch(function (ex) {
    console.log('parsing failed', ex)
  })
}