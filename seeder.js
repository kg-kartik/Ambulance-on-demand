const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Load env vars
dotenv.config({
    path : ".env"
})

//Load models
const Ambulance = require("./model/ambulance");
//Connecting to db
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true
}).then(() => console.log('Database connected'))
.catch((err) => console.log(err,"error"));

//Read json files
const ambulance = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/ambulance.json`,'utf-8')
)

//Seeding data into the db
const importData = async () => {
    try {
      await Ambulance.create(ambulance)
      console.log('Data Imported');
      process.exit();
    } catch (err) {
      console.error(err);
    }
};

if(process.argv[2] === '-i'){
    importData();
}