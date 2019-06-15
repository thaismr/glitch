const mongoose = require('mongoose')
const graphql = require('graphql')
const {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = graphql
const Teaser = mongoose.model('teaser')
const UserType = require('./user_type')
const ChannelType = require('./channel_type')
const CommentType = require('./comment_type')

const TeaserType = new GraphQLObjectType({
  name: 'TeaserType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return Teaser.findById(parentValue).populate('user')
          .then(teaser => teaser.user)
      }
    },
    channel: {
      type: require('./channel_type'),
      resolve(parentValue) {
        return Teaser.findById(parentValue).populate('channel')
          .then(teaser => teaser.channel)
      }
    },
    content: { type: GraphQLString },
    upvotes: {
      type: new GraphQLList(require('./user_type')),
      resolve(parentValue) {
        //return Teaser.findVotes(parentValue.id)
        return Teaser.findById(parentValue).populate('upvotes')
          .then(teaser => teaser.upvotes)
      }
    },
    comments: {
      type: new GraphQLList(require('./comment_type')),
      resolve(parentValue) {
        //return Teaser.findComments(parentValue.id)
        return Teaser.findById(parentValue).populate('comments')
          .then(teaser => teaser.comments)
      }
    }
  })
})

module.exports = TeaserType
