const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  tour: {
    type: Schema.Types.ObjectId,
    ref: 'tour'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  content: { type: String }
})

mongoose.model('comment', CommentSchema)
