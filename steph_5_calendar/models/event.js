var mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  time: {type: String, required: true },
  eventGroup: { type: String },
  url: { type: String },
  issueCat: { type: String },
  meetAddress: { type: String, required: true },
  meetCity: { type: String, required: true },
  meetState: { type: String, required: true },
  meetZip: { type: Number, required: true } 
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;