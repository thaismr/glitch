const mongoose = require('mongoose')
const graphql = require('graphql')
const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType
} = graphql
const UserType = require('./user_type')
const TourType = require('./tour_type')
const TeaserType = require('./teaser_type')
const LevelType = require('./level_type')
const ChannelType = require('./channel_type')
const Channel = mongoose.model('channel')
const Level = mongoose.model('level')
const User = mongoose.model('user')
const Tour = mongoose.model('tour')
const Teaser = mongoose.model('teaser')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    currentUser: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({})
      }
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return User.findById(id)
      }
    },
    levels: {
      type: new GraphQLList(LevelType),
      resolve() {
        return Level.find({})
      }
    },
    channels: { //maybe irrelevant
      type: new GraphQLList(ChannelType),
      resolve() {
        return Channel.find({})
      }
    },
    tours: {
      type: new GraphQLList(TourType),
      resolve() {
        return Tour.find({})
      }
    },
    tour: {
      type: TourType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return Tour.findById(id)
      }
    },
    teaser: {
      type: TeaserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return Teaser.findById(id)
      }
    }
  })
})

module.exports = RootQueryType
