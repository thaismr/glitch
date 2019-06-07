const mongoose = require('mongoose')
const graphql = require('graphql')
const {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = graphql
const TourType = require('./tour_type')
const UserType = require('./user_type')
const Comment = mongoose.model('comment')

const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  fields: () => ({
    id: { type: GraphQLID },
    tour: {
      type: require('./tour_type'),
      resolve(parentValue) {
        return Comment.findById(parentValue).populate('tour')
          .then(comment => {
            return comment.tour
          })
      }
    },
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return Comment.findById(parentValue).populate('user')
          .then(comment => {
            return comment.user
          })
      }
    },
    content: { type: GraphQLString }
  })
})

module.exports = CommentType
