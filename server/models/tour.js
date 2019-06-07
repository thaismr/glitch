const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('user')
const Level = mongoose.model('level')

const TourSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: 'level'
  },
  upvotes: { type: Number, default: 0 },
  content: { type: String },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
})

TourSchema.statics.upVote = (id) => {
  const Tour = mongoose.model('tour')

  return Tour.findById(id)
    .then(tour => {
      ++tour.upvotes
      return tour.save()
    })
}

TourSchema.statics.addComment = function(userId, tourId, content) {
  const Comment = mongoose.model('comment')

  return this.findById(tourId)
    .then(tour => {
      return User.findById(userId)
        .then(user => {
          const comment = new Comment({user, tour, content})
      //    user.comments.push(comment)
          tour.comments.push(comment)
          return Promise.all([ comment.save(), tour.save() ])
            .then(([ comment, tour ]) => tour)
        })
    })
}

TourSchema.statics.findComments = function(id) {
  return this.findById(id)
  .populate('comments')
  .then(tour => tour.comments)
}

TourSchema.statics.addTour = (title, userId, levelId, content) => {

  const Tour = mongoose.model('tour')

  // create tour, update user, level and return updated tour:
  return User.findById(userId)
    .then(user => {
      return Level.findById(levelId)
        .then(level => {
          const tour = new Tour({ title, user, level, content })   // prepare our Tour schema
          user.tours.push(tour)                             // add tour to user's list
          level.tours.push(tour)                            // add tour to level's list
          return Promise.all([ tour.save(), user.save(), level.save() ])
            .then(([ tour, user, level ]) => tour)
        })
    })


}

mongoose.model('tour', TourSchema)
