const config = require("config");
const mongoose = require("mongoose");
const auth = require('./routes/auth');
const admins = require('./routes/admins');
const users = require('./routes/users');
const treatments = require('./routes/treatments');
const patients = require('./routes/patients');
const doctors = require('./routes/doctors');
const nurses = require('./routes/nurses');
const schedules = require('./routes/schedules');
const appointments = require('./routes/appointments');
const posts = require('./routes/posts');

// const dataentry = require('./routes/dataentry');


if(!config.get("jwtPrivateKey")){
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

const express = require('express');
const app = express();

const cloudDBUrl = "mongodb+srv://nuzattasnim:turnaDB28@cluster0.mjmvr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const localDBUrl = "mongodb://localhost:27017/bloodFeed";

mongoose.connect(cloudDBUrl)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/auth', auth);
app.use('/admins', admins);
app.use('/posts', posts);
app.use('/users', users);
app.use('/treatments', treatments)
app.use('/patients', patients);
app.use('/doctors', doctors);
app.use('/nurses', nurses);
app.use("/schedules",schedules);
app.use('/appointments', appointments);
// app.use('/dataentry', dataentry);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));