import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import fetchTour from '../queries/fetchTour'

class TourShow extends Component {
  render() {
    const { tour } = this.props.data

    if (!tour) { return <div>Loading...</div> }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{tour.title}</h3>
      </div>
    )
  }
}

export default graphql(fetchTour, {
  options: (props) => { return { variables: { id: props.params.id }}}
})(TourShow)
