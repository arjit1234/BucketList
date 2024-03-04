const bodyParser = require('body-parser');
const express = require('express');
const { add, remove, edit } = require('./routes/bucketlist')
const mongoose = require('mongoose');
const  home  = require('./routes/home')
const path  = require('path');

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



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', 'views');
app.set('view engine', 'ejs');

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')))





app.use('/home', home);
app.use('/add', add);
app.use('/remove', remove);
app.use('/edit', edit)

app.get('/', (req, res) =>{
    res.redirect('/home');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });