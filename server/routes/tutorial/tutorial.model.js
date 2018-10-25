var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Tutorial = new Schema({
    title: {type: String, required: true, unique: true},
    link: {type: String, required: true, unique: true},
    deck: {type: String, required: true},
    thumb: {type: String},
    tags: [{type: String}],
    featured: {type: Boolean, default: false},
    state: {type: String, default: 'completePlanning'},
    sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}],
    created: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: null},
    log: [{type: Object}],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    published: { type: Boolean, default: false}
  });

Tutorial.pre('save', function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('Tutorial', Tutorial);
