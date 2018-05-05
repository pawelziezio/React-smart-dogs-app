import React from 'react'
import BigCalendar from 'react-big-calendar';

import moment from 'moment'
BigCalendar.momentLocalizer(moment);
moment.locale("pl");

import {connect} from 'react-redux'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const mapStateToProps = state => ({
  favoritesEvents: state.favoritesData.favoritesEvents,
  allEvents: state.allEventsData.allEvents
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

const EventsCalendar = props => {
  const eventsFiltered = props.allEvents.filter(
    event => props.favoritesEvents.indexOf(event.id) !== -1
  )
  const eventsToDisplayInCalendar = eventsFiltered.map(
    event => ({
      ...event,
      title: event.name,
      start: new Date(event.date).valueOf(),
      end: new Date(event.date).valueOf()  +3600000
    })
  )

  return (
    <div>
      <div style={{height: 400}}>

        <BigCalendar
          events={eventsToDisplayInCalendar}
          startAccessor={eventsToDisplayInCalendar.start}
          endAccessor={eventsToDisplayInCalendar.end}
          messages={{
            today: 'Bieżący miesiąc',
            previous: '<',
            next: '>',
          }}
          views={['month']}
        />
      </div>
    </div>

  )
}
export default connect(mapStateToProps, mapDispatchProps)(EventsCalendar)
