const http = require("http");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
const ambulanceRoute = require("./routes/ambulance");
const socketevents = require("./socketevents");

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

var io =require("socket.io")(server);

io.on('connection', (socket) => {
    console.log("A user just connected");
    socket.on("request-for-help",(data) => {
        socket.broadcast.emit("request",data);
    });
})



//for url encoding
app.use(express.urlencoded({
    extended : false
}));



app.use(bodyParser.json());

//Initializing Routes
app.use('/api/ambulance',ambulanceRoute);

// const server = http.Server(app);

