import React, { Component } from "react";
import axios from "axios"
import socketIOClient from 'socket.io-client'
import ReactMapGL, { GeolocateControl,NavigationControl} from 'react-map-gl'
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";


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
        width : "50vw",
        height : "50vh",
        latitude : 40.72,
        longitude : -73.97,
        zoom : 12
      }
    };
  }


componentDidMount() {
 
  axios.get('http://localhost:5000/api/ambulance/info/'+this.props.match.params.ambulanceid)
  .then((response) => {
      this.setState({
        displayName : response.data.displayName,
        address : response.data.location.address
      }, () => {
        socket.emit('join', {
          displayName : this.state.displayName
        })
    })
  })
   
  socket.on("request", (eventData) =>{
    console.log(eventData);
    this.setState({
      patientId : eventData.patientId,
      residence : eventData.location.address
    })
  })
}

requestforHelp = () => {
  socket.emit("request-accepted", {
    displayName : this.state.displayName,
    address : this.state.address
  })
}


myMap = React.createRef();

  render() {
    const { address, displayName,patientId,residence} = this.state;
    return (
      <div>
        <h1> I am  {displayName} </h1>
        <h1> {address} </h1>
        <h1> {patientId} needs your help</h1>
        <h1> He is here - {residence} </h1>
        <button onClick={this.requestforHelp}> Help Patient </button>
        
        <ReactMapGL
          ref = {this.myMap} 
          {...this.state.viewport}
          onViewportChange = {viewport => this.setState({
            viewport
          })}
          mapStyle = "mapbox://styles/mapbox/navigation-preview-day-v2"
          mapboxApiAccessToken = "pk.eyJ1Ijoia2cta2FydGlrIiwiYSI6ImNrOGdicTdwZjAwMGUzZW1wZmxpMDdvajcifQ.7FtdVDqPnZh4pCtTtcNf4g">

          <Geocoder
          position = "top-left"
          mapRef = {this.myMap} mapboxApiAccessToken="pk.eyJ1Ijoia2cta2FydGlrIiwiYSI6ImNrOGdicTdwZjAwMGUzZW1wZmxpMDdvajcifQ.7FtdVDqPnZh4pCtTtcNf4g"></Geocoder>
          <GeolocateControl 
          postion = "bottom-left"/>
          <NavigationControl 
          position = "bottom-left" />
        </ReactMapGL>

      </div>
    );
  }
}

export default App;