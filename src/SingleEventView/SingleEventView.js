import React from 'react'
import {SingleMapView} from '../MapView'
import {connect} from 'react-redux'
import {Grid, Row, Col} from 'react-bootstrap'
import {FavoritesToggleButton} from '../FavoritesToggleButton'

import moment from 'moment'
import 'moment/locale/pl';
import './SingleEventview.css'


const mapStateToProps = state => ({
  allEvents: state.allEventsData.allEvents,
  favoriteEvents: state.favoritesData.favoritesEvents,
  places: state.placesData.places
})

// const mapDispatchProps = dispatch => ({
//   addEventToFavorites: (eventId) => dispatch({
//     type: 'ADD_EVENT_TO_FAVORITES',
//     eventId: eventId
//   }),
//   removeEventFromFavorites: (eventId) => dispatch({
//     type: 'REMOVE_EVENT_FROM_FAVORITES',
//     eventId: eventId
//   })
// })

const SingleEventView = props => {

  const placeOfEvent = props.places.find(
    place => place.events.indexOf(parseInt((props.params.eventId), 10)) !== -1
  )
  const setup = {
    'musical': '#0d3fd8',
    'spektakl': '#0c7a1a',
    'koncert': '#f74a4a'
  }

  return (
    <Grid>
      {
        props.allEvents.filter(
          event => event.id === parseInt((props.params.eventId), 10)
        ).map(
          event =>
            <div className="single-event-container" key={event.id}>
              <Row>
                <Col sm={6} smOffset={1}>
                  <img className="event-img" role="presentation"
                       src={process.env.PUBLIC_URL + '/img/events/' + event.image}/>
                </Col>
                <Col className="event-details" sm={4}>
                  <FavoritesToggleButton favoriteEventId={event.id}/>
                  <hr />
                  <h1 className="event-name">{event.name}</h1>
                  <h4 className="event-date">{event.hour}.00
                    | {moment(event.date).format('dddd, LL').charAt(0).toUpperCase() + moment(event.date).format('dddd, LL').slice(1)}</h4>
                  <br />
                  <h4>{placeOfEvent.name}</h4>
                  <h5>{placeOfEvent.city}, {placeOfEvent.address}</h5>
                  <br />
                  <br />
                  <span className="event-price">{event.price} PLN</span><span>&#160;&#160;&#160; </span>
                  <span className="event-category" style={{
                    backgroundColor: setup[event.category] || '#75767a'
                  }}>{event.category}</span>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col sm={8} smOffset={1}>
                  <div className="event-description-container">
                    <h3>Opis wydarzenia:</h3>
                    <p className="event-description">{event.description}</p>
                  </div>
                </Col>
              </Row>
              <br/>
              <br/>
              <Row>
                <Col sm={10} smOffset={1}>
                  <SingleMapView placeOfEvent={placeOfEvent}/>
                </Col>
              </Row>
            </div>
        )
      }
    </Grid>
  )
}

export default connect(mapStateToProps)(SingleEventView)