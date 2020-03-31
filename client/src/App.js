import React, { Component } from "react";
import axios from "axios"
import socketIOClient from 'socket.io-client'

const socket =  socketIOClient("http://localhost:5000/")
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName : "",
      address : "",
      patientId : "",
      residence : ""
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

  render() {
    const { address, displayName,patientId,residence} = this.state;
    return (
      <div>
        <h1> I am  {displayName} </h1>
        <h1> {address} </h1>
        <h1> {patientId} needs your help</h1>
        <h1> He is here - {residence} </h1>
        <button onClick={this.requestforHelp}> Help Patient </button>
      </div>
    );
  }
}

export default App;