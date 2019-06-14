import gql from 'graphql-tag'

export default gql`
  query TourShow($id: ID!) {
    tour(id: $id) {
      id
      title
      level {
        name
      }
      user {
        name
      }
      content
      upvotes
      comments {
        id
        content
      }
    }
  }
`
