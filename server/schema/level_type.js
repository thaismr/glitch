const mongoose = require('mongoose')
const graphql = require('graphql')
const {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = graphql
const Level = mongoose.model('level')
const ChannelType = require('./channel_type')
const TourType = require('./tour_type')

const LevelType = new GraphQLObjectType({
  name: 'LevelType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    exp: { type: GraphQLInt },
    description: { type: GraphQLString },
    channels: {
      type: new GraphQLList(ChannelType),
      resolve(parentValue) {
        //return Level.findChannels(parentValue.id)
        return Level.findById(parentValue).populate('channels')
          .then(level => level.channels)
      }
    },
    tours: {
      type: new GraphQLList(TourType),
      resolve(parentValue) {
        //return Level.findTours(parentValue.id)
        return Level.findById(parentValue).populate('tours')
          .then(level => level.tours)
      }
    }
  })
})

module.exports = LevelType
