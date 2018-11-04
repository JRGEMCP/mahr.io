var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Course = new Schema({
    title: {type: String, required: true, unique: true},
    link: {type: String, required: true, unique: true},
    deck: {type: String},
    tags: [{type: String}],
    thumb: {type: String},
    featured: {type: Boolean, default: false},
    cost: {type: Number, default: 0},
    state: {type: String, default: 'completePlanning'},
    modules: [{type: mongoose.Schema.Types.ObjectId, ref: 'Module'}],
    created: { type: Date, default: Date.now },
    published: {type: Boolean, default: false},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    cost: {type: Number, default: 0}
  });

module.exports = mongoose.model('Course', Course);
