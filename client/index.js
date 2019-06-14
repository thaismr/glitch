import './style/style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import App from './components/App'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Dashboard from './components/Dashboard'
import TourList from './components/TourList'
import TourShow from './components/TourShow'
import TourCreate from './components/TourCreate'
import UserCreate from './components/UserCreate'

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
})

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={TourList} />
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={Dashboard} />
          <Route path="tours/new" component={TourCreate} />
          <Route path="users/new" component={UserCreate} />
          <Route path="tours/:id" component={TourShow} />
        </Route>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
)
