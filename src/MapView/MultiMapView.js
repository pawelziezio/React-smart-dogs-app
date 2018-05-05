import React from 'react'
import GoogleMap from 'google-map-react'
import {connect} from 'react-redux'
import PlaceMarker from './PlaceMarker'
import './MultiMapView.css'


const mapSateToProps = (state) => ({
  places: state.placesData.places
})


const MultiMapView = (props) => {

  const placesOfEvents = props.places.filter(
    place =>
      props.searchedEvents.find(
        event =>
        place.events.indexOf(event.id) !== -1
      )
  )
  const centerLat = placesOfEvents.map(
      place => {
        return place.lat
      }
    ).reduce((prev , next)=> prev + next, 0) / placesOfEvents.length;

  const centerLng = placesOfEvents.map(
      place => {
        return place.lng
      }
    ).reduce((prev , next)=> prev + next, 0) / placesOfEvents.length;

  return (
    <div>
      <h1>Wybrane wydarzenia na mapie:</h1>
      <br/>
      <div className="map-container" style={{width: props.mapWidth}}>
        <GoogleMap
          bootstrapURLKeys={{key: "AIzaSyBmM74lQFB4qAQQz6Cc2HKaR6TNnoz7CKI"}}
          center={{
            lat: centerLat || 54.430,
            lng: centerLng || 18.595
          }}
          defaultZoom={11}>
          {
            placesOfEvents.map(
              place =>
                <PlaceMarker key={place.id}
                             lat={place.lat}
                             lng={place.lng}
                             text={place.name}> </PlaceMarker>
            )
          }
        </GoogleMap>
      </div>
    </div>
  )
}

export default connect(mapSateToProps)(MultiMapView)