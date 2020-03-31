import React, { Component } from "react";
import axios from "axios"
import socketIOClient from 'socket.io-client'

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
  const socket =  socketIOClient("http://localhost:5000/")
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

  render() {
    const { address, displayName,patientId,residence} = this.state;
    return (
      <div>
        <h1> I am  {displayName} </h1>
        <h1> {address} </h1>
        <h1> {patientId} needs your help</h1>
        <h1> He is here - {residence} </h1>
      </div>
    );
  }
}

export default App;