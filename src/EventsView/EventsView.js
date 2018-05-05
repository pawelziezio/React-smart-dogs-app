import React from 'react'
import {Grid} from 'react-bootstrap'
import {EventsListView} from '../EventsListView'

export default (props) => {
  return (
    <Grid>
      <div>
        <h1>Lista nadchodzących wydarzeń</h1>
        <br />
        <EventsListView colWidthMd={3} doNotShowHeader={true}/>
      </div>
      {props.children}
    </Grid>
  )
}
