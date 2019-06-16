import React, { Component } from 'react'
//import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import query from '../queries/fetchTours'

export const PageWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

class TourList extends Component {
  onTourDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch())
  }

  renderTours() {
    return (
      this.props.data.tours.map(({ id, title }) => {
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
      )
    }

  render() {
    if(this.props.data.loading) { return <div>Loading...</div>}

    return (
      <PageWrapper>

        <ul className="collection">
          {this.renderTours()}
        </ul>
        <Link
          to="/tours/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>

      </PageWrapper>
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
