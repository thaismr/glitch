import React, { Component } from 'react'
import AuthForm from './AuthForm'
import { graphql } from 'react-apollo'
import { hashHistory } from 'react-router'
import mutation from '../mutations/signup'
import query from '../queries/currentUser'

class SignupForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      errors: []
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.data.currentUser) {
      hashHistory.push('/dashboard')
    }
  }

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
        <h4>Signup</h4>
        <AuthForm
          errors={ this.state.errors }
          onSubmit={ this.onSubmit.bind(this) }
        />
      </div>
    )
  }
}

export default graphql(query)(graphql(mutation)(SignupForm))
