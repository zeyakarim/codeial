// import the library kue
const kue = require('kue');

// This createQueue() function will create the queue inside kue
const queue = kue.createQueue();

module.exports = queue;