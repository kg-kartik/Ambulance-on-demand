import React, { Component } from "react";
import axios from "axios"
import socketIOClient from 'socket.io-client'

class User extends Component {
  constructor(props) {
    super(props)
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
  const socket =  socketIOClient("http://localhost:5000")
  socket.emit("request-for-help",requestDetails)
}

  render() {
    return (
      <div>
        <button onClick={this.requestforHelp}> Request for help</button>
      </div>
    );
  }
}

export default User;