import React from 'react'
import {connect} from 'react-redux'
import {Col, DropdownButton, MenuItem, Row, Grid} from 'react-bootstrap'
import {EventsListView} from '../EventsListView'
import {MultiMapView} from '../MapView'
import {Link} from 'react-router'
import './SearchEngine.css'

const mapStateToProps = state => ({
  allEvents: state.allEventsData.allEvents
})

const setup = {
  'musical': '#0d3fd8',
  'spektakl': '#0c7a1a',
  'koncert': '#f74a4a',
  'Gdańsk': '#9d9ea0',
  'Gdynia': '#9d9ea0',
  'Sopot': '#9d9ea0'
}


class SearchEngine extends React.Component {
  constructor() {
    super()

    this.state = {
      search: '',
      found: [],
      phrase: "Co Ciebie interesuje?",
      eventKeyCategory: 'wszystko',
      eventKeyPlace: 'Cale',
      eventKeyTime: 31104000000,
      eventKeyCategoryName: 'Kategorie',
      eventKeyPlaceName: 'Gdzie',
      eventKeyTimeName: 'Kiedy',
      errorMessage: false
    }

    this.handleSubmit = (event) => {
      const search = this.state.search.toLowerCase()
      event.preventDefault()
      if (this.state.search === '') {
        return
      }

      const foundEvents = this.props.allEvents.filter(
        event => (
          event.name.toLowerCase().includes(search) ||
          event.category.toLowerCase().includes(search) ||
          event.description.toLowerCase().includes(search)
        )
      )
      if (foundEvents.length > 0) {
        this.setState({
          found: foundEvents,
          errorMessage: false
        })
      } else {
        this.setState({
          errorMessage: true,
          found: []
        })
      }
    }


    this.handleDropdownAll = (eventKeyValue, event) => {
      //console.log(data)
      //let eventKeyValue = 'asdfas'
      this.setState({
        errorMessage: false,
        search: ''
      })
      const [prefix, value] = eventKeyValue.split('.')
      let {eventKeyCategory, eventKeyPlace, eventKeyTime, eventKeyCategoryName, eventKeyPlaceName, eventKeyTimeName} = this.state

      switch (prefix) {
        case 'Category':
          eventKeyCategory = value;
          eventKeyCategoryName = event.target.innerHTML
          break;
        case 'Place':
          eventKeyPlace = value;
          eventKeyPlaceName = event.target.innerHTML
          break;
        case 'Time':
          eventKeyTime = parseInt(value, 10);
          eventKeyTimeName = event.target.innerHTML.split(' ').pop()
          break;
        default:
          break
      }

      let chosenTimeFrame = (new Date().getTime() + eventKeyTime)

      if (eventKeyCategory === 'wszystko' && eventKeyPlace === 'Cale') {
        this.setState({
          found: this.props.allEvents.filter(
            event => new Date(event.date).getTime() < chosenTimeFrame)
        })
      } else if (eventKeyCategory === 'wszystko') {
        this.setState({
          found: this.props.allEvents.filter(event => event.city === eventKeyPlace
          ).filter(
            event => new Date(event.date).getTime() < chosenTimeFrame)
        })
      } else if (eventKeyPlace === 'Cale') {
        this.setState({
          found: this.props.allEvents.filter(event => event.category === eventKeyCategory
          ).filter(
            event => new Date(event.date).getTime() < chosenTimeFrame)
        })
      } else {
        this.setState({
          found: this.props.allEvents.filter(event => event.category === eventKeyCategory
          ).filter(
            event => event.city === eventKeyPlace
          ).filter(
            event => new Date(event.date).getTime() < chosenTimeFrame)
        })
      }


      this.setState({
        eventKeyCategory: eventKeyCategory,
        eventKeyPlace: eventKeyPlace,
        eventKeyTime: eventKeyTime,

        eventKeyCategoryName: eventKeyCategoryName,
        eventKeyPlaceName: eventKeyPlaceName,
        eventKeyTimeName: eventKeyTimeName,

      })
      this.handleSubmit({preventDefault: () => {}})
    }

    this.handleFilterCategory = () => {
      this.handleDropdownAll('Category.wszystko', { target: { innerHTML: 'Kategorie'}})

    }
    this.handleFilterPlace = () => {
      this.handleDropdownAll('Place.Cale', { target: { innerHTML: 'Gdzie'}})

    }
    this.handleFilterTime = () => {
      this.handleDropdownAll('Time.31104000000', { target: { innerHTML: 'Kiedy'}})

    }
  }

  render() {

    return (
      <Grid className="background-image-container" fluid>
        <Row className="search-container search-background">
          <Col>
            <form onSubmit={this.handleSubmit}>
              <Col>
                <h1 className="caption-main">Miasto żyje!</h1>
              </Col>
              <Col>
                <h3 className="caption-submain">Wszystkie wydarzenia w jednym miejscu</h3>
                <br/>
              </Col>
              <Row>
                <Col xs={8} xsOffset={2}>
                  <div className="search-form-wrapper">
                    <input className="search-form"
                           type="text"
                           placeholder={this.state.phrase}
                           value={this.state.search}
                           onChange={
                             event => this.setState({
                               search: event.target.value
                             })
                           }
                    />
                    <button type="submit" className="search-button"><span className="glyphicon glyphicon-search"/>
                    </button>
                  </div>
                </Col>
              </Row>

            </form>
          </Col>
          <Row>
            <Col>
              <DropdownButton id="select-category" bsStyle={'default'}
                              title={this.state.eventKeyCategoryName }
                              onSelect={this.handleDropdownAll}>
                <MenuItem eventKey="Category.koncert">koncert</MenuItem>
                <MenuItem eventKey="Category.musical">musical</MenuItem>
                <MenuItem eventKey="Category.spektakl">spektakl</MenuItem>
                <MenuItem eventKey="Category.wszystko">wszystko</MenuItem>
              </DropdownButton>

              <DropdownButton id="select-city" bsStyle={'default'}
                              title={this.state.eventKeyPlaceName }
                              onSelect={this.handleDropdownAll}>
                <MenuItem eventKey="Place.Gdańsk">Gdańsk</MenuItem>
                <MenuItem eventKey="Place.Sopot">Sopot</MenuItem>
                <MenuItem eventKey="Place.Gdynia">Gdynia</MenuItem>
                <MenuItem eventKey="Place.Cale">Całe Trójmiasto</MenuItem>
              </DropdownButton>

              <DropdownButton id="select-date" bsStyle={'default'}
                              title={ this.state.eventKeyTimeName }
                              onSelect={this.handleDropdownAll}>
                <MenuItem eventKey={'Time.604800000'}>Najbliższy tydzień</MenuItem>
                <MenuItem eventKey={'Time.2592000000'}>Najbliższy miesiąc</MenuItem>
                <MenuItem eventKey={'Time.7776000000'}>Najbliższy kwartał</MenuItem>
                <MenuItem eventKey={'Time.31104000000'}>Najbliższy rok</MenuItem>
              </DropdownButton>

            </Col>
          </Row>
        </Row>

        <Grid>
          <Row>
            <Col className="shift-left">
              <h3 className="error-message"> {this.state.errorMessage === true && this.state.search !== '' ? "Nie znaleziono wyników dla '" + this.state.search + "' ale sprawdź wydarzenia, które rekomendujemy" : null} </h3>
              <div className="filters-container">
                {
                  (this.state.eventKeyCategory !== 'wszystkie') ?
                    <span className="filters-intro">Wybrane filtry:
                      <span onClick={this.handleFilterCategory} className="filters-chosen-category"
                            style={{
                              backgroundColor: setup[this.state.eventKeyCategory] || '#ffffff'
                            }}>{this.state.eventKeyCategory} X</span>
                    </span> : null
                }
                {
                  (this.state.eventKeyPlace !== 'Cale') ?
                    <span onClick={this.handleFilterPlace} className="filters-chosen-place"
                          style={{
                            backgroundColor: setup[this.state.eventKeyPlace] || '#ffffff'
                          }}>{this.state.eventKeyPlace} X</span>
                    : null
                }
                {
                  (this.state.eventKeyTimeName !== 'Kiedy') ?
                    <span onClick={this.handleFilterTime} className="filters-chosen-time">{this.state.eventKeyTimeName} X</span>
                    : null
                }
              </div>
              <br />
              <br />

              <ul>
                <EventsListView colWidthMd={3} colWidthSm={6}
                                eventsFound={this.state.found}
                                search={this.state.search}
                                events={this.state.found.length !== 0 ? this.state.found : this.props.allEvents.sort(
                                  (a, b) => (new Date(a.date)).getTime() - (new Date(b.date)).getTime()
                                ).slice(0, 8)}/>

              </ul>
            </Col>
          </Row>
          <Row>
            <div className="see-more-link-container">
              <Link className="see-more-link" to="/events">
                <h3 className="see-more-link-caption">Zobacz więcej wydarzeń <span
                  className="glyphicon glyphicon-menu-right"/></h3>
              </Link>
            </div>
            <br/>
          </Row>
          <Row>
            <Col>
              <hr/>
              <MultiMapView
                searchedEvents={this.state.found.length !== 0 ? this.state.found : this.props.allEvents.sort(
                  (a, b) => (new Date(a.date)).getTime() - (new Date(b.date)).getTime()
                ).slice(0, 8)}/>
            </Col>
          </Row>
        </Grid>
      </Grid>

    )
  }

}
export default connect(mapStateToProps)(SearchEngine)