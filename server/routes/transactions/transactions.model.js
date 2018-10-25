var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Transaction = new Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
    cost: {type: Number, default: 0},
    created: { type: Date, default: Date.now },
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
  });

module.exports = mongoose.model('Transaction', Transaction);
