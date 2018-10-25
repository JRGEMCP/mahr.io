var mongoose = require('mongoose');

var schema = mongoose.Schema({
  title: {type: String, required: true},
  deck: {type: String},
  link: {type: String, required: true},
  start: { type: Date, default: null },
  end: { type: Date, default: null },
  content: [{type: String}]  // tutorials__{{id}} || sections__{{id}}
  // dynamically populate sections attribute
});

module.exports = mongoose.model('Module', schema);
