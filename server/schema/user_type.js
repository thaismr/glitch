const mongoose = require('mongoose')
const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = graphql
const LevelType = require('./level_type')
const TourType = require('./tour_type')
const User = mongoose.model('user')
//const Tour = mongoose.model('tour')

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    exp: { type: GraphQLInt },
    level: {
      type: LevelType,
      resolve(parentValue) {
        return User.findById(parentValue).populate('level')
          .then(user => {
            return user.level
          })
      }
    },
    tours: {
      type: new GraphQLList(TourType),
      resolve(parentValue) {
        return User.findTours(parentValue.id)
      }
    }
  })
})

module.exports = UserType
