const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  tour: {
    type: Schema.Types.ObjectId,
    ref: 'tour'
  },
  teaser: {
    type: Schema.Types.ObjectId,
    ref: 'teaser'
  },
  content: { type: String }
})

mongoose.model('comment', CommentSchema)
