import React from 'react'
import {Button} from 'react-bootstrap'

import './FavoritesToggleButton.css'

import {connect} from 'react-redux'

const mapStateToProps = state => ({
  allEvents: state.allEventsData.allEvents,
  favoriteEvents: state.favoritesData.favoritesEvents
})

const mapDispatchProps = dispatch => ({
  addEventToFavorites: (eventId) => dispatch({
    type: 'ADD_EVENT_TO_FAVORITES',
    eventId: eventId
  }),
  removeEventFromFavorites: (eventId) => dispatch({
    type: 'REMOVE_EVENT_FROM_FAVORITES',
    eventId: eventId
  })
})

const FavoritesToggleButton = (props) => {
  return (
    <div >
      {
        props.favoriteEvents.indexOf(props.favoriteEventId) !== -1 ?

          <Button onClick={() => props.removeEventFromFavorites(props.favoriteEventId)}>
            <span className="glyphicon glyphicon-heart"/> Usuń
          </Button> :

          <Button onClick={() => props.addEventToFavorites(props.favoriteEventId)}>
            <span className="glyphicon glyphicon-heart-empty"/> Zapisz
          </Button>
      }
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchProps)(FavoritesToggleButton);