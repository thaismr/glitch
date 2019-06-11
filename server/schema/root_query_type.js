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
const User = mongoose.model('user')
const Tour = mongoose.model('tour')

const RootQuery = new GraphQLObjectType({
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
    }
  })
})

module.exports = RootQuery
