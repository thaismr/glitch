const mongoose = require('mongoose')
const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = graphql
const User = mongoose.model('user')
const LevelType = require('./level_type')
const TourType = require('./tour_type')
const TeaserType = require('./teaser_type')
const CommentType = require('./comment_type')

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    exp: { type: GraphQLInt },
    level: {
      type: LevelType,
      resolve(parentValue) {
        return User.findById(parentValue).populate('level')
          .then(user => user.level)
      }
    },
    tours: {
      type: new GraphQLList(TourType),
      resolve(parentValue) {
        return User.findById(parentValue).populate('tours')
          .then(user => user.tours)
      }
    },
    teasers: {
      type: new GraphQLList(TeaserType),
      resolve(parentValue) {
        return User.findById(parentValue).populate('teasers')
          .then(user => user.teasers)
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return User.findById(parentValue).populate('comments')
          .then(user => user.comments)
      }
    }
  })
})

module.exports = UserType
