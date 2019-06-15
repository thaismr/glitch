const mongoose = require('mongoose')
const graphql = require('graphql')
const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType
} = graphql
const UserType = require('./user_type')
const TourType = require('./tour_type')
const TeaserType = require('./teaser_type')
const Comment = mongoose.model('comment')

const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  fields: () => ({
    id: { type: GraphQLID },
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return Comment.findById(parentValue).populate('user')
          .then(comment => comment.user)
      }
    },
    tour: {
      type: require('./tour_type'),
      resolve(parentValue) {
        return Comment.findById(parentValue).populate('tour')
        .then(comment => comment.tour)
      }
    },
    teaser: {
      type: TeaserType,
      resolve(parentValue) {
        return Comment.findById(parentValue).populate('teaser')
          .then(comment => comment.teaser)
      }
    },
    content: { type: GraphQLString }
  })
})

module.exports = CommentType
