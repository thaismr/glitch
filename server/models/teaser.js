const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('user')
const Channel = mongoose.model('channel')
const Comment = mongoose.model('comment')

const TeaserSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  channel: {
    type: Schema.Types.ObjectId,
    ref: 'channel'
  },
  content: { type: String },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
})

TeaserSchema.statics.addTeaser = (title, userId, channelId, content) => {
  const Teaser = mongoose.model('teaser')

  return User.findById(userId)
    .then(user => {
      return Channel.findById(channelId)
        .then(channel => {
          const teaser = new Teaser({ title, user, channel, content })
          user.teasers.push(teaser)
          channel.teasers.push(teaser)
          return Promise.all([ teaser.save(), user.save(), channel.save() ])
            .then(
              ([ teaser, user, channel ]) => teaser
            )
        })
    })
}

TeaserSchema.statics.addVote = function(userId, teaserId) {
  return this.findById(teaserId)
    .then(teaser => {
      return User.findById(userId)
        .then(user => {
          teaser.upvotes.push(user)     // find user instead to avoid duplicates
          return teaser.save()
        })
    })
}

/*
TeaserSchema.statics.findVotes = function(id) {
  this.findById(id).populate('upvotes')
    .then(teaser => teaser.upvotes)
}
*/

TeaserSchema.statics.addComment = function(userId, teaserId, content) {
  const Comment = mongoose.model('comment')

  return this.findById(teaserId)
    .then(teaser => {
      return User.findById(userId)
        .then(user => {
          const comment = new Comment({ user, teaser, content })
          // user.comments.push(comment)
          teaser.comments.push(comment)
          return Promise.all([ comment.save(), teaser.save() ])
            .then(
              ([ comment, teaser ]) => teaser
            )
        })
    })
}

/*
TeaserSchema.statics.findComments = function(id) {
  this.findById(id).populate('comments')
    .then(teaser => teaser.comments)
}
*/

mongoose.model('teaser', TeaserSchema)
