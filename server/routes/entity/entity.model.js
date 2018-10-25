var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Entity = new Schema({
    title: {type: String, required: true, unique: true},
    link: {type: String, required: true, unique: true},
    deck: {type: String, required: true},
    tags: [{type: String}],
    state: {type: String, default: 'completePlanning'},
    sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}],

    created: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: null},
    log: [{type: Object}],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    published: { type: Boolean, default: false},
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}]
  });

Entity.pre('save', function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('Entity', Entity);
