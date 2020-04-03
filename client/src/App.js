import React, { Component } from "react";
import axios from "axios"
import socketIOClient from 'socket.io-client'
import ReactMapGL, { GeolocateControl,NavigationControl, Marker} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./App.css"

const socket =  socketIOClient("http://localhost:5000/")

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName : "",
      address : "",
      patientId : "",
      residence : "",
      viewport: {
        width : "100vw",
        height : "100vh",
        latitude: 28.7041,
          longitude: 77.1025,
        zoom : 10
      },
      userLocation : {},
      ambulanceLocation : {}
    };
  }


componentDidMount() {
 
  axios.get('http://localhost:5000/api/ambulance/info/'+this.props.match.params.ambulanceid)
  .then((response) => {
    var setAmbulanceLocation = {
      latitude : response.data.location.coordinates[1],
      longitude : response.data.location.coordinates[0] 
    }
      this.setState({
        displayName : response.data.displayName,
        address : response.data.location.address,
        ambulanceLocation : setAmbulanceLocation
      }, () => {
        socket.emit('join', {
          displayName : this.state.displayName
        })
    })
  })
   
socket.on("request", (eventData) =>{
  console.log(eventData.location.userLocation.latitude);
  var setUserLocation = {
    latitude : eventData.location.userLocation.latitude,
    longitude : eventData.location.userLocation.longitude
  }
  this.setState({
    patientId : eventData.patientId,
    residence : eventData.location.addressPatient,
    userLocation : setUserLocation
  })
})
}

mapRef = React.createRef()
 
handleViewportChange = (viewport) => {
  this.setState({
    viewport: { ...this.state.viewport, ...viewport }
  })
}

handleGeocoderViewportChange = (viewport) => {
  const geocoderDefaultOverrides = { transitionDuration: 1000 }
  return this.handleViewportChange({
    ...viewport,
    ...geocoderDefaultOverrides
  })
}

requestforHelp = () => {
  socket.emit("request-accepted", {
    displayName : this.state.displayName,
    address : this.state.address,
    ambulanceLocation : this.state.ambulanceLocation
  })
}

render() {
  console.log(this.state.userLocation)
  const { address, displayName,patientId,residence} = this.state;
  return (
    <div>
      <h1> I am  {displayName} </h1>
      <h1> {address} </h1>
      <h1> {patientId} needs your help</h1>
      <h1> He is here - {residence} </h1>
      <button onClick={this.requestforHelp}> Help Patient </button>

      <ReactMapGL
        {...this.state.viewport}
        ref={this.mapRef}
        onViewportChange = {viewport => this.setState({
          viewport
        })}
        mapStyle = "mapbox://styles/mapbox/navigation-preview-day-v2"
        mapboxApiAccessToken = "pk.eyJ1Ijoia2cta2FydGlrIiwiYSI6ImNrOGdicTdwZjAwMGUzZW1wZmxpMDdvajcifQ.7FtdVDqPnZh4pCtTtcNf4g">

        <Geocoder
          mapRef={this.mapRef}
          onResult={this.handleOnResult}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken="pk.eyJ1Ijoia2cta2FydGlrIiwiYSI6ImNrOGdicTdwZjAwMGUzZW1wZmxpMDdvajcifQ.7FtdVDqPnZh4pCtTtcNf4g"
          inputValue = "Haridwar"
        />

        {Object.keys(this.state.userLocation).length !== 0 ? (
          <Marker
            latitude={this.state.userLocation.latitude}
            longitude={this.state.userLocation.longitude}
          >
            <img className="marker" src="patient.png"></img>
          </Marker>
        ) : ( 
          <div>Empty</div>
        )}
      
      </ReactMapGL>

    </div>
  );
}
}

export default App;