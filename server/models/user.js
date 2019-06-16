const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  exp: { type: Number, default: 0 },
  level: {
    type: Schema.Types.ObjectId,
    ref: 'level'
  },
  tours: [{
    type: Schema.Types.ObjectId,
    ref: 'tour'
  }],
  teasers: [{
    type: Schema.Types.ObjectId,
    ref: 'teaser'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
})

UserSchema.pre('save', function save(next) {
  const user = this

  if ( !user.isModified('password') ) {
    return next()
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

UserSchema.statics.addExp = (id) => {
  const User = mongoose.model('user')

  return User.findById(id)
    .then(user => {
      ++user.exp
      return user.save()
    })
}

/* IRRELEVANT ?
UserSchema.statics.findTours = function(id) {
  return this.findById(id)
  .populate('tours')
  .then(user => user.tours)
}

UserSchema.statics.findTeasers = function(id) {
  return this.findById(id)
  .populate('teasers')
  .then(user => user.teasers)
}
*/

mongoose.model('user', UserSchema)
