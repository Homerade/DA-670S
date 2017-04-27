var mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
  title: { type: String },
  start: { type: Date },
  eventGroup: { type: String },
  url: { type: String }
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;