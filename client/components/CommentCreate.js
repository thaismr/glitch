import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CommentCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: ''
    }
  }

  onSubmit(event) {
    event.preventDefault()

    this.props.mutate({
      variables: {
        tour: this.props.tourId,
        content: this.state.content
      }
    }).then(() => this.setState( { content: '' }))
  }

  render() {
    return (
      <form onSubmit={ this.onSubmit.bind(this) }>
        <label>Add a comment:</label>
        <input
          value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
      </form>
    )
  }
}

const mutation = gql`
  mutation AddComment($tour: ID, $content: String) {
    addComment(tour: $tour, content: $content) {
      id
      comments {
        id
        content
      }
    }
  }
`

export default graphql(mutation)(CommentCreate)
