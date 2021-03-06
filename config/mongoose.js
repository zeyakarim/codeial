// require mongoose library to connect the database
const mongoose = require('mongoose');

// require environment file
const env = require('./environment');

// connect to database
mongoose.connect(`mongodb://localhost/${env.db}`);

// acquire the connection(check the connection is succesfull)
const db = mongoose.connection;

// on error
db.on('error',console.error.bind(console,'Error Connecting to MongoDB'));

// once the connection is successfull to the db
db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;