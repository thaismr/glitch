const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LevelSchema = new Schema({
  name: { type: String },
  exp: { type: Number, default: 0 },
  description: { type: String },
  channels: [{
    type: Schema.Types.ObjectId,
    ref: 'channel'
  }],
  tours: [{
    type: Schema.Types.ObjectId,
    ref: 'tour'
  }]
})

/*
LevelSchema.statics.findChannels = function(id) {
  return this.findById(id)
    .populate('channels')
    .then(level => level.channels)
}

LevelSchema.statics.findTours = function(id) {
  return this.findById(id)
  .populate('tours')
  .then(level => level.tours)
}
*/

mongoose.model('level', LevelSchema)
