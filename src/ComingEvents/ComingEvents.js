import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Col, Thumbnail, Button} from 'react-bootstrap'

const mapStateToProps = state => ({
  allEvents: state.allEventsData.allEvents
})

const ComingEvents = props => {

  return (
    <div>
      {
        props.events.sort(
          (a, b) => (new Date(a.date)).getTime() - (new Date(b.date)).getTime()
        ).slice(0, 8)
          .map(
            event =>
              <Col xs={6} sm={3} key={event.id}>
                <Link to={'/events/' + event.id}>
                  <Thumbnail bsClass="event-thumbnail" src={process.env.PUBLIC_URL + '/img/events/' + event.image}
                             alt="242x200">
                    <h3 className="cardheader">{event.name}</h3>
                    <p>Description</p>
                    <p>
                      <Button bsStyle="primary">{event.price} PLN</Button>&nbsp;
                      <Button bsStyle="default">{event.date}</Button>
                    </p>
                  </Thumbnail>
                </Link>
              </Col>
          )
      }
    </div>
  )
}

export default connect(mapStateToProps)(ComingEvents)
