const mongoose = require('mongoose')
const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString
} = graphql
const UserType = require('./user_type')
const LevelType = require('./level_type')
const CommentType = require('./comment_type')
const Tour = mongoose.model('tour')

const TourType = new GraphQLObjectType({
  name: 'TourType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return Tour.findById(parentValue).populate('user')
          .then(tour => {
            return tour.user
          })
      }
    },
    level: {
      type: LevelType,
      resolve(parentValue) {
        return Tour.findById(parentValue).populate('level')
          .then(tour => {
            return tour.level
          })
      }
    },
    upvotes: { type: GraphQLInt },
    content: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return Tour.findComments(parentValue.id)
      }
    }
  })
})

module.exports = TourType
