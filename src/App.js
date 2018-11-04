import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  //store data in this state
  state = {
    venues: []
  }

//invoking the 'getVenues' function
  componentDidMount() {
    this.getVenues()
    this.loadMap()

  }

  //loading the map
  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAXmmZjHr3x_iXdpr54D151pVX-_tLzObQ&callback=initMap")
    window.initMap = this.initMap
  }
  //data for foursquare
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore"
    const parameters = {
      client_id: 'HFLI2JEVAT4PCMDUNH1UTQJKGQMO53SGZ0U05WW3JOZ5MCZS',
      client_secret:'UDZHWUCJIC4DZZPQ1D0KTV1VO0CQDJR1L21A0HJFKO5NEP3N',
      ll: '43.6532, -79.3832',
      query:'food',
      near:'Toronto',
      v:'20181028',
      limit: '10'
    }

    axios.get(endPoint + new URLSearchParams(parameters))
    .then(resp => {
      this.setState({
        venues: resp.data.resp.groups[0].items
      })
    })
    .catch(err => {
      console.log('error' + err)
    })
  }

   initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.6532, lng: -79.3832},
        zoom: 8
      });


    //loop over the venues array
    this.state.venues.map(theSixVenue => {
      const marker = new window.google.maps.Marker({
        position: {lat: 43.6532, lng: -79.3832},
        map: map,
        title: theSixVenue.venue.name
      })

    })

    }


  render() {
    return (
      <main>
        <div id="map"></div>
        </main>
    );
  }
}

function loadScript(url) {
  const index = window.document.getElementsByTagName('script')[0]
  const script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)

}

export default App;
