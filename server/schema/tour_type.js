const mongoose = require('mongoose')
const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString
} = graphql
const Tour = mongoose.model('tour')
const UserType = require('./user_type')
const LevelType = require('./level_type')
const ChannelType = require('./channel_type')
const CommentType = require('./comment_type')

const TourType = new GraphQLObjectType({
  name: 'TourType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return Tour.findById(parentValue).populate('user')
          .then(tour => tour.user)
      }
    },
    level: {
      type: require('./level_type'),
      resolve(parentValue) {
        return Tour.findById(parentValue).populate('level')
          .then(tour => tour.level)
      }
    },
    channel: {
      type: require('./channel_type'),
      resolve(parentValue) {
        return Tour.findById(parentValue).populate('channel')
          .then(tour => tour.channel)
      }
    },
    upvotes: { type: GraphQLInt },
    content: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        //return Tour.findComments(parentValue.id)
        return Tour.findById(parentValue).populate('comments')
          .then(tour => tour.comments)
      }
    }
  })
})

module.exports = TourType
