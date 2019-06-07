import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import gql from 'graphql-tag'
import query from '../queries/fetchTours'

class TourCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      content: ''
    }
  }

  onSubmit(event) {
    // prevent form from being submitted by the browser:
    event.preventDefault()

    this.props.mutate({
      variables: {
        title: this.state.title,
        content: this.state.content
      },
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'))
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>

        <h3>Create a new Tour:</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Tour title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
          <label>Content:</label>
          <input
            onChange={event => this.setState({ content: event.target.value })}
            value={this.state.content}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddTour($title: String, $content: String) {
    addTour(title: $title, content: $content) {
      id
      title
    }
  }
`

export default graphql(mutation)(TourCreate)
