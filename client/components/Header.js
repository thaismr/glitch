import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import query from '../queries/currentUser'
import mutation from '../mutations/logout'

class Header extends Component {

  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query }]
    })
  }

  renderHeaderButtons() {
    const { loading, currentUser } = this.props.data

    //console.log(currentUser);


    if (loading) { return <div /> }

    if (currentUser) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>
            Logout
          </a>
        </li>
      )
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
        </div>
      )
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">
            { this.renderHeaderButtons() }
          </ul>
        </div>
      </nav>
    )
  }
}

export default graphql(mutation)(
  graphql(query)(Header)
)
