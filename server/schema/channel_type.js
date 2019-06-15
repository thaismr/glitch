const mongoose = require('mongoose')
const graphql = require('graphql')
const {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = graphql
const Channel = mongoose.model('channel')
const LevelType = require('./level_type')
const TourType = require('./tour_type')
const TeaserType = require('./teaser_type')

const ChannelType = new GraphQLObjectType({
  name: 'ChannelType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    level: {
      type: require('./level_type'),
      resolve(parentValue) {
        return Channel.findById(parentValue).populate('level')
          .then(channel => channel.level)
      }
    },
    description: { type: GraphQLString },
    tours: {
      type: new GraphQLList(TourType),
      resolve(parentValue) {
        //return Channel.findTours(parentValue.id)
        return Channel.findById(parentValue).populate('tours')
          .then(channel => channel.tours)
      }
    },
    teasers: {
      type: new GraphQLList(TeaserType),
      resolve(parentValue) {
        //return Channel.findTeasers(parentValue.id)
        return Channel.findById(parentValue).populate('teasers')
          .then(channel => channel.teasers)
      }
    }
  })
})

module.exports = ChannelType
