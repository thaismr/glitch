import React, {Component} from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class TourList extends Component {
  renderTours() {
    return this.props.data.tours.map(tour => {
      return (
        <li key={tour.id} className="collection-item">
          {tour.title}
        </li>
      )
    })
  }

  render() {
    if(this.props.data.loading) { return <div>Loading...</div>}

    return (
      <ul className="collection">
        {this.renderTours()}
      </ul>
    )
  }
}

const query = gql`
  {
    tours {
      id
      title
    }
  }
`
// calls graphql, wich returns a function, and calls that function
export default graphql(query)(TourList)
