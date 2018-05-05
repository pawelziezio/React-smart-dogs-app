import React from 'react'
import {Col} from 'react-bootstrap'
import moment from 'moment'
import 'moment/locale/pl';
import {Link} from 'react-router'
import './EventsListView.css'

import {connect} from 'react-redux'

const mapStateToProps = state => ({
  allEvents: state.allEventsData.allEvents,
  favoriteEvents: state.favoritesData.favoritesEvents
})

// <img src={process.env.PUBLIC_URL + '/img/events/' + event.image} alt="242x200"/>

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

class EventsListView extends React.Component {
  constructor () {
    super()

    this.state = {
      sort: 'none'
    }
  }


  render () {
    const props = this.props
    const setup = {
      'musical': '#0d3fd8',
      'spektakl': '#0c7a1a',
      'koncert': '#f74a4a'
    }
    const tmp = (props.events || props.allEvents)
    const events = this.state.sort === 'none' ? tmp : ( this.state.sort === 'asc' ? tmp.sort((a, b) => a.price - b.price) : tmp.sort((b, a) => a.price - b.price))
    return (
      <div>
        {props.events && props.eventsFound == 0 ? <h2 className="events-header">Najbliższe wydarzenia</h2> : (props.events ? <h2 className="events-header"> </h2> : null)}
        {
          events.map(event =>
            <Col sm={props.colWidthSm} md={props.colWidthMd} key={event.id}>
              <div className="event-thumbnail">
                <Link className="thumbnail-no-highlight" to={'/events/' + event.id}>
                  <div className="thumbnail-image"
                       style={{backgroundImage: "url(" + process.env.PUBLIC_URL + '/img/events/' + event.image + ")"}}></div>
                  <h3 className="thumbnail-cardheader">{event.name}</h3>
                </Link>

                <div className="thumbnail-details">
                  {
                    props.favoriteEvents.indexOf(event.id) !== -1 ?

                      <span className="add-to-favorites-toggle-button"
                            style={{backgroundColor: 'white', color: '#fd5d1d', cursor: 'pointer'}}
                            onClick={() => props.removeEventFromFavorites(event.id)}
                      >
                    <span className="glyphicon glyphicon-heart"/> Usuń </span> :

                      <span className="add-to-favorites-toggle-button"
                            style={{cursor: 'pointer'}} onClick={() => props.addEventToFavorites(event.id)}
                      >
                    <span className="glyphicon glyphicon-heart-empty"/> Zapisz
                  </span>
                  }
                  <p><span
                    className="glyphicon glyphicon-list-alt"/>
                    <span className="thumbnail-date"><span> {event.hour}.00 | </span>{moment(event.date).format('dddd, LL').charAt(0).toUpperCase() + moment(event.date).format('dddd, LL').slice(1)}</span>
                  </p>
                  <p><span className="glyphicon glyphicon-map-marker"/> {event.city}</p>
                  <br />
                  <p><span onClick={() => this.setState({ sort: this.state.sort === 'none' ? 'asc' : (this.state.sort === 'asc' ? 'dsc' : 'asc')})} className="thumbnail-price">{event.price} PLN</span><span
                    className="thumbnail-category" style={{
                    backgroundColor: setup[event.category] || '#75767a'
                  }}>{event.category}</span></p>
                </div>
              </div>
            </Col>
          )
        }
      </div>

    )
  }
}
export default connect(mapStateToProps, mapDispatchProps)(EventsListView)
