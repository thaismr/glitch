import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import gql from 'graphql-tag'

class UserCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: ''
    }
  }

  onSubmit(event) {
    // prevent form from being submitted by the browser:
    event.preventDefault()

    this.props.mutate({
      variables: {
        userName: this.state.userName
      }
    }).then(() => hashHistory.push('/'))
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>

        <h3>Create a new User:</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>User name:</label>
          <input
            onChange={event => this.setState({ userName: event.target.value })}
            value={this.state.userName}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddUser($userName: String) {
    addUser(name: $userName) {
      name
    }
  }
`

export default graphql(mutation)(UserCreate)
