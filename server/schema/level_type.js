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

const LevelType = new GraphQLObjectType({
  name: 'LevelType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    exp: { type: GraphQLInt },
    tours: {
      type: new GraphQLList(require('./level_type')),
      resolve(parentValue) {
        return Level.findTours(parentValue.id)
      }
    },
    users: {
      type: new GraphQLList(require('./user_type')),
      resolve(parentValue) {
        return Level.findUsers(parentValue.id)
      }
    }
  })
})

module.exports = LevelType
