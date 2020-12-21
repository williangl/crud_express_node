const express = require('express');

const app = express();

const mongoose = require('mongoose');

// parse request data (post body content)
const bodyParser = require('body-parser');

const addressBook = require('./controllers/addressBook');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', addressBook);

mongoose.connect('mongodb://localhost:27017/AddressBook',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
  console.log('Connected to DB');
}).catch((error) => {
  console.log('Error to connect:', error);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

module.exports = app;
