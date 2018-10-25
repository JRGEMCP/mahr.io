var mongoose = require('mongoose'),
  schema = mongoose.Schema({
    body: {type: String, required: true, default: null},
    type: {type: String, default: 'markdown'},
    created: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('Section', schema);
