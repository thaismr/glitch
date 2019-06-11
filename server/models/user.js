const bcrypt = require('bcrypt-nodejs')
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

UserSchema.statics.addExp = (id) => {
  const User = mongoose.model('user')

  return User.findById(id)
    .then(user => {
      ++user.exp
      return user.save()
    })
}

UserSchema.statics.findTours = function(id) {
  return this.findById(id)
  .populate('tours')
  .then(user => user.tours)
}

mongoose.model('user', UserSchema)
