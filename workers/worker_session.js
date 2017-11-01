var schedule = require('node-schedule');
var db = require('./db');


var rule = new schedule.RecurrenceRule();
var j = schedule.scheduleJob({hour: 14, minute: 25, dayOfWeek: [0,2,4,6]}, function(){
  console.log('The answer to life, the universe, and everything!');
});