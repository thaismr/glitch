import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'
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

  onSubmit(e) {
    // prevent form from being submitted by the browser:
    e.preventDefault()

    const userId = this.props.data.currentUser.id

    console.log(this.state)

    this.props.mutate({
      variables: {
        title: this.state.title,
        user: userId,
        level: '5cf81292b8e50b5e06ace414',
        content: this.state.content
      },
      refetchQueries: [{ query }]
    }).then(() => <Redirect to={{pathname: '/'}} />)


  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>

        <h4>Create a new Tour:</h4>
        <form onSubmit={ this.onSubmit.bind(this) }>
          <label>Tour title:</label>
          <input
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <label>Content:</label>
          <input
            value={this.state.content}
            onChange={(e) => this.setState({ content: e.target.value })}
          />
          <button className="btn">Submit</button>
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddTour($title: String, $user: ID, $level: ID, $content: String) {
    addTour(title: $title, user: $user, level: $level, content: $content) {
      id
      title
    }
  }
`

export default graphql(mutation)(TourCreate)
