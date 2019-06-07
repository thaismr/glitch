import gql from 'graphql-tag'

export default gql`
  query TourShow($id: ID!) {
    tour(id: $id) {
      id
      title
    }
  }
`
