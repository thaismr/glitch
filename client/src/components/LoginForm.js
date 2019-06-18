import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import AuthForm from './AuthForm'
import mutation from '../mutations/login'
import query from '../queries/currentUser'

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = { errors: [] }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.data.currentUser) {
      <Redirect to={{pathname: "/dashboard"}} />
    }
  }

/*
  componentDidUpdate() {
    if(this.props.data.currentUser) {
      hashHistory.push('/dashboard')
    }
  }
*/

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message)
        this.setState({ errors })
      })
  }

  render() {
    return (
      <div>
        <h4>Login</h4>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    )
  }
}

export default graphql(mutation)(
  graphql(query)(LoginForm)
)