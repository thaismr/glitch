const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LevelSchema = new Schema({
  name: { type: String },
  exp: { type: Number, default: 0 },
  tours: [{
    type: Schema.Types.ObjectId,
    ref: 'tour'
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
})

LevelSchema.statics.findUsers = function(id) {
  return this.findById(id)
  .populate('users')
  .then(level => level.users)
}

LevelSchema.statics.findTours = function(id) {
  return this.findById(id)
  .populate('tours')
  .then(level => level.tours)
}

mongoose.model('level', LevelSchema)
