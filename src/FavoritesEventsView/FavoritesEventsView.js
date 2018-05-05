import React from 'react'
import {
  Grid,
  Col,
  Row
} from 'react-bootstrap'
import './FavoritesEventsView.css'

import {MultiMapView} from '../MapView'
import {EventsCalendar} from '../EventsCalendar'
import {EventsListView} from '../EventsListView'

import {connect} from 'react-redux'

const mapStateToProps = state => ({
  favoritesEvents: state.favoritesData.favoritesEvents,
  allEvents: state.allEventsData.allEvents
})

const FavoritesEventsView = props => {

  const eventsToDisplay = props.allEvents.filter(
    event => props.favoritesEvents.indexOf(event.id) !== -1
  )

  if (props.favoritesEvents.length > 0) {
    return (
      <Grid>
        <Col xs={6}>
          <div className="favorite-thumbnails">
            <br />
            <div className="fav--shift-left">
              <EventsListView colWidthMd={6} events={eventsToDisplay}/>
            </div>
          </div>
        </Col>
        <Col xs={6}>
          <Row>
            <div className="favorite-calendar-container">
              <EventsCalendar />
            </div>
          </Row>
          <hr/>
          <Row>
            <div className="favorite-map">
              <MultiMapView mapWidth={'100%'} searchedEvents={eventsToDisplay}/>
            </div>
          </Row>
        </Col>

      </Grid>
    )
  } else {
    return (
      <Grid>
        < div >
          <br />
          <br />
          <h1>Twoje ulubione wydarzenia</h1>
          <br />
          <h2> Nie masz żadnych wydarzeń dodanych do folderu ulubione</h2>
        </div>
      </Grid>
    )


  }

}

export default connect(mapStateToProps)(FavoritesEventsView)