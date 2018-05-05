import React from 'react'
import {connect} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import {SingleMapView} from '../MapView'
import {EventsListView} from '../EventsListView'
import {CommentsView} from '../CommentsView'
import './PlaceView.css'


const mapStateToProps = (state) => ({
  places: state.placesData.places,
  allEvents: state.allEventsData.allEvents
})

const PlaceView = (props) =>

  <div>
    <div>
      {
        props.places.filter(place =>
          place.id === parseInt(props.params.placeId, 10)
        ).map(place =>
          <div className="singleEvent-container" key={place.id}>
            <Row id="place-top">
              <Col sm={12}>
                <div className="place-main-image"
                     style={{
                       backgroundImage: "url(" + process.env.PUBLIC_URL +
                       '/img/places/' + place.image + ")"
                     }}></div>
              </Col>
            </Row>

            <Row className="row place-decriptionandevents-row">
              <Col sm={4}>
                <h1 className="place-description-header">{place.name}</h1>
                <h4>{place.city} </h4>
                <h4> ul.{place.address}</h4>
                <h4><a href="#" className="place-www"><b>www</b></a></h4>
              </Col>
              <div >
                <Col sm={2} className="place-description-buttons-col">
                  <div className="place-description-buttons">
                    <a href="#place-comments-view">
                      Opinie
                    </a></div>
                </Col>
              </div>
              <Col sm={1}>
                <div className="place-description-buttons">
                  <a href="#place-events-view">
                    Wydarzenia
                  </a></div>
              </Col>
            </Row>

            <Row>
              <Col sm={10} smOffset={1}>
                <SingleMapView placeOfEvent={place}/>
              </Col>
            </Row>
            <Row id="place-events-view" className="place-events-list-row">
              <Col sm={10} smOffset={1}>
                <h2 className="place-sections-header">Wydarzenia w tej lokalizacji:</h2>
                <EventsListView colWidthSm={4} colWidthMd={4}
                                events={props.allEvents.filter(event =>
                                    // I put "-1" because "props.places" is an array, and its items start with number O, but "events.json" is an object and its ids starts with 1
                                  props.places[parseInt(props.params.placeId) - 1].events.indexOf(event.id) !== -1
                                )
                                }
                />
              </Col>
            </Row>

            <Row id="place-comments-view">
              <Col sm={10} smOffset={1}>
                <h2 className="place-sections-header">Opinie:</h2>
                <CommentsView {...props} />
                <br/>
                <br/>
                <h4><a href="#place-top" className="place-www">Do góry</a></h4>
              </Col>

            </Row>
          </div>
        )
      }
    </div>
  </div>

export default connect(mapStateToProps)(PlaceView)