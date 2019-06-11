const graphql = require('graphql')
const {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = graphql
const mongoose = require('mongoose')
const User = mongoose.model('user')
const Level = mongoose.model('level')
const Tour = mongoose.model('tour')
const Comment = mongoose.model('comment')
const UserType = require('./user_type')
const LevelType = require('./level_type')
const TourType = require('./tour_type')
const CommentType = require('./comment_type')

const mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parentValue, { name }) {
        return (new User({ name })).save()
      }
    },
    addLevel: {
      type: LevelType,
      args: {
        name: { type: GraphQLString },
        exp: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return (new Level(args)).save()
      }
    },
    addTour: {
      type: TourType,
      args: {
        title: { type: GraphQLString },
        user: { type: GraphQLID },
        level: { type: GraphQLID },
        content: { type: GraphQLString }
      },
      resolve(parentValue, {title, user, level, content}) {
        return Tour.addTour(title, user, level, content)
      }
    },
    addComment: {
      type: TourType,
      args: {
        user: { type: GraphQLID },
        tour: { type: GraphQLID },
        content: { type: GraphQLString }
      },
      resolve(parentValue, {user, tour, content}) {
        return Tour.addComment(user, tour, content)
      }
    },
    upTour: {
      type: TourType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, { id }) {
        return Tour.upVote(id)
      }
    },
    addExp: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, { id }) {
        return User.addExp(id)
      }
    },
    deleteTour: {
      type: TourType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, { id }) {
        return Tour.remove({ _id: id })
      }
    }
  }
})

module.exports = mutations
