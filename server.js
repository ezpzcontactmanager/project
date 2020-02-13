require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const user = require("./backend/routes/user");
const contacts = require("./backend/routes/contacts");
const InitiateMongoServer = require("./backend/config/db");
const path = require('path');

InitiateMongoServer();

const app = express();

// PORT


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, UPDATE, DELETE");
  next();
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/", user);
app.use("/me/contacts", contacts)

app.use(express.static(path.join(__dirname, 'frontend', 'build')));

//checking if the server is in production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

const PORT =  process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});