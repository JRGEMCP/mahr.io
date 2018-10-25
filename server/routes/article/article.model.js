var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Article = new Schema({
    title: {type: String, required: true, unique: true},
    link: {type: String, required: true, unique: true},
    deck: {type: String, required: true},
    type: {type: String, default: 'article'},
    tags: [{type: String}],
    state: {type: String, default: 'completePlanning'},
    sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}],
    scenario: {type: String},
    design: {type: String },
    code: {type: String },
    featured: {type: Boolean, default: false},

    created: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: null},
    log: [{type: Object}],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    published: { type: Boolean, default: false},
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}]
  });

Article.pre('save', function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('Article', Article);
