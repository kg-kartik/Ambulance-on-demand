const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;


mongoose.connect(db, {useNewUrlParser : true,
    useUnifiedTopology: true})
.then(() => console.log('Database connected'))
.catch((err) => {
    console.log(err);
})
const PORT = process.env.PORT || 5000;

//for url encoding
app.use(express.urlencoded({
    extended : false
}));


app.use(cors());
app.use(bodyParser.json());


  
app.listen(PORT, console.log(`Server started on ${PORT}`));