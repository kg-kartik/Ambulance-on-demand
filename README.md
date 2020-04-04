# Ambulance-on-demand
A MERN Web App in which patients can make requests to the ambulance person in real time and depending upon the patient's location, the nearby ambulance will respond to the patients' request.

### Prerequisites
1) Clone this repo first.
2) Make sure you have Node installed.
3) To install the server side packages , do ``` npm install ```.
4) Then do ``` cd client ``` and do ``` npm install ``` to install the client side packages.
5) Go to config folder and in the keys.js, addd your own MongoURI for 

### Running

1) Do ``` npm run dev ``` to run the development server.
2) Now go to http://localhost:3000 to set your location as patient and make request to the user.
3) Open http://localhost:3000/01 , http://localhost:3000/02 till 04 in other tabs .
4) The nearby ambulance will receive the requests and thus requests can be accepted from there.

## Demo Video

![Demo Video](demo/ambulance.gif)

## Contributing

This is basic web app for now with hardcoded values/sample data , it will be updated with more features like heat map and patient handle and ambulance handel in the future.
Till then, feel free to raise a PR.
