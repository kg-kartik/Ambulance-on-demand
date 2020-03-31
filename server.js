const http = require("http");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
const requestModel = require("././model/request");
const myMethods = require("./routes/ambulance");
const method = myMethods.method;
const otherMethod = myMethods.otherMethod;

mongoose.connect(db, {useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex : true})
.then(() => console.log('Database connected'))
.catch((err) => {
    console.log(err);
})
app.use(cors());

const PORT = process.env.PORT || 5000;

var server = app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

//Initializing the server instance
var io =require("socket.io")(server);

//Connecting Users
io.on('connection', (socket) => {
    console.log("A user just connected");

    //Ambulance users joinning seperate rooms
    socket.on('join' ,(data) => {  
    socket.join(data.displayName);
    console.log(`User joined room ${data.displayName}`)
})
    

//Listening for help event from patient
//@User Component
socket.on("request-for-help",(data) => {
    const requestTime = new Date();
    const requestId = mongoose.Types.ObjectId();
    const location = {
        coordinates : [
            data.location.longitude,
            data.location.latitude
        ]
    }
    const patientId = data.patientId;
    const status = "waiting";

    const request = new requestModel({
        requestId,
        requestTime,
        location,
        patientId,
        status
    })

    //Saving request to the database
    request.save().then((request) => {
        console.log("ok");
    }).catch((err) => {
        console.log(err);
    })

    //Fetching nearest ambulance
    const nearestAmbulance =  otherMethod(76,12,206000);
    nearestAmbulance.then((result) => {
        for(let i=0;i<result.length;i++)
        {
            //Emitting the event to the nearby ambulances
            //@App component
            io.to(result[i].displayName).emit("request",data);
            
        }
    }).catch((err) => {
        console.log(err);
    })
    });

    //Listening for the event from ambulance 
    //@App Component
    socket.on("request-accepted", (data) => {
        ambulanceDetails = data;
        console.log(ambulanceDetails);
        //Emitting the event to the patient
        //@User Component
        io.emit("request-sent",ambulanceDetails);
    })
})


//for url encoding
app.use(express.urlencoded({
    extended : false
}));

app.use(bodyParser.json());

//Initializing Routes
app.use('/api/ambulance',method);



