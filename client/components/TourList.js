import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import query from '../queries/fetchTours'

class TourList extends Component {
  onTourDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch())
  }

  renderTours() {
    return this.props.data.tours.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/tours/${id}`}>
            {title}
          </Link>
          <i
            className="material-icons"
            onClick={() => this.onTourDelete(id)}
          >
            delete
          </i>
        </li>
      )
    })
  }

  render() {
    if(this.props.data.loading) { return <div>Loading...</div>}

    return (
      <div>
        <ul className="collection">
          {this.renderTours()}
        </ul>
        <Link
          to="/tours/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteTour($id: ID) {
    deleteTour(id: $id) {
      id
    }
  }
`

// calls graphql, wich returns a function, and calls that function
export default graphql(mutation)(
  graphql(query)(TourList)
)
