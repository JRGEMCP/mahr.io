var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Log = new Schema({
    action: {type: String, default: 'click'},
    path: {type: String},
    created: { type: Date, default: Date.now },
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  });

module.exports = mongoose.model('Log', Log);
