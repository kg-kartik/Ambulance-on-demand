import React, { Component } from "react";
import socketIOClient from 'socket.io-client'

const socket =  socketIOClient("http://localhost:5000")
class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
        displayName : "",
        address : ""
    }
  }

componentDidMount() {
  socket.on("request-sent",(data) => {
      console.log(data);
    this.setState ({
        displayName : data.displayName,
        address : data.address
    })
  })
}
requestforHelp = () => {
    var requestDetails = {
        patientId : "1",
        location: {
            address: "Indiranagar, Bengaluru, Karnataka, India",
            latitude: 12.9718915,
            longitude: 77.64115449999997
        }
    }
    socket.emit("request-for-help",requestDetails);
}
  render() {
      const {displayName,address} = this.state;
    return (
      <div>
        <button onClick={this.requestforHelp}> Request for help</button>
        <h1>{displayName} is coming to take you</h1>
        <h1> He is here {address}</h1> 
      </div>
    );
  }
}

export default User;