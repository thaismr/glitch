const _ = require('lodash')
const graphql = require('graphql')
const { GraphQLSchema } = graphql

const query = require('./root_query_type')
const mutation = require('./mutations')

module.exports = new GraphQLSchema({
  query,
  mutation
})
