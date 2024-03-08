const bodyParser = require('body-parser');
const express = require('express');
const { manage, add, remove, edit } = require('./routes/bucketlist')
const { login, register } = require('./routes/user');
const mongoose = require('mongoose');
const  home  = require('./routes/home')
const path  = require('path');
const cors = require('cors');

const app = express();
const port = 300

const uri = "mongodb://localhost:27017/bucket"

async function connect() {
    try {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.log(error);
    }
  }
  connect();


  app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend server URL
    credentials: true, // Allow cookies to be sent to/from the frontend
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../BucketList/BucketList/index.html'));
});

app.use(express.static(path.join(__dirname, '../BucketList/BucketList')));




app.use('/home', home);
app.use('/login', login);
app.use('/register', register);
app.use('/manage', manage);
app.use('/add', add);
app.use('/remove', remove);
app.use('/edit', edit);

app.get('/', (req, res) =>{
    res.redirect('/home');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });