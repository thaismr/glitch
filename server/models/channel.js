const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Level = mongoose.model('level')

const ChannelSchema = new Schema({
  name: { type: String },
  level: {
    type: Schema.Types.ObjectId,
    ref: 'level'
  },
  description: { type: String },
  tours: [{
    type: Schema.Types.ObjectId,
    ref: 'tour'
  }],
  teasers: [{
    type: Schema.Types.ObjectId,
    ref: 'teaser'
  }]
})

/*
ChannelSchema.statics.findTours = function(id) {
  return this.findById(id)
    .populate('tours')
    .then(channel => channel.tours)
}

ChannelSchema.statics.findTeasers = function(id) {
  return this.findById(id)
    .populate('teasers')
    .then(channel => channel.teasers)
}
*/

ChannelSchema.statics.addChannel = (name, levelId, description) => {
  const Channel = mongoose.model('channel')
  return Level.findById(levelId)
    .then(level => {
      const channel = new Channel({ name, level, description })
      level.channels.push(channel)
      return Promise.all([ channel.save(), level.save() ])
        .then(
          ([ channel, level ]) => channel
        )
    })
}

mongoose.model('channel', ChannelSchema)
