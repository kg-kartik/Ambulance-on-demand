import React, { Component } from "react";
import socketIOClient from 'socket.io-client'
import ReactMapGL, { GeolocateControl,NavigationControl, Marker} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./App.css"

const socket =  socketIOClient("http://localhost:5000")

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
        displayName : "",
        address : "",
        addressPatient : "",
        viewport: {
          width : "100vw",
          height : "100vh",
          latitude: 28.7041,
          longitude: 77.1025,
          zoom : 10
      },
      userLocation : {},
      ambulanceLocation : {
      }
    }
}

componentDidMount() {
  socket.on("request-sent",(data) => {
    var setAmbulanceLocation = {
      latitude : data.ambulanceLocation.latitude,
      longitude : data.ambulanceLocation.longitude
    }
    this.setState ({
        displayName : data.displayName,
        address : data.address,
        ambulanceLocation : setAmbulanceLocation
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
    var requestDetails = {
        patientId : "1",
        location: {
            addressPatient: this.state.addressPatient,
            userLocation : this.state.userLocation
        }
    }
    socket.emit("request-for-help",requestDetails);
}
handleOnResult = (event) => {
  var patientLocation = {
    latitude : event.result.center[1],
    longitude : event.result.center[0]
  }
  this.setState({
    addressPatient : event.result.place_name,
    userLocation : patientLocation
  })
}

render() {
  console.log(this.state.ambulanceLocation.latitude)
  const {displayName,address} = this.state;
  return (
    <div>
      <button onClick={this.requestforHelp}> Request for help</button>
      <button onClick={this.setUserLocation}> My Location </button>
      <h1>{displayName} is coming to take you</h1>
      <h1> He is here {address}</h1> 
      <ReactMapGL
        {...this.state.viewport}
        ref={this.mapRef}
        onViewportChange = {this.handleViewPortChange}
        mapStyle = "mapbox://styles/mapbox/navigation-preview-day-v2"
        mapboxApiAccessToken = "pk.eyJ1Ijoia2cta2FydGlrIiwiYSI6ImNrOGdicTdwZjAwMGUzZW1wZmxpMDdvajcifQ.7FtdVDqPnZh4pCtTtcNf4g">
        

        <Geocoder
          mapRef={this.mapRef}
          onResult={this.handleOnResult}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken="pk.eyJ1Ijoia2cta2FydGlrIiwiYSI6ImNrOGdicTdwZjAwMGUzZW1wZmxpMDdvajcifQ.7FtdVDqPnZh4pCtTtcNf4g"
          inputValue = "Haridwar"
        />
           {Object.keys(this.state.ambulanceLocation).length !== 0 ? (
          <Marker
            latitude={this.state.ambulanceLocation.latitude}
            longitude={this.state.ambulanceLocation.longitude}
          >
            <img className="marker" src="ambulancemarker.png"></img>
          </Marker>
        ) : ( 
          <Marker
            latitude={this.state.viewport.latitude}
            longitude={this.state.viewport.longitude}
          >
            <img className="marker" src="logo.png"></img>
          </Marker>
        )}
      </ReactMapGL>
    </div>
  );
}
}

export default User;