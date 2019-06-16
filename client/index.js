//import './style/style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from './components/App'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Dashboard from './components/Dashboard'
import TourList from './components/TourList'
import TourShow from './components/TourShow'
import TourCreate from './components/TourCreate'
import UserCreate from './components/UserCreate'
import requireAuth from './components/requireAuth'

const link = new HttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  dataIdFromObject: o => o.id
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path="*" component={App} />
          <Route exact path="/" component={TourList} />
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={requireAuth(Dashboard)} />
          <Route path="tours/new" component={requireAuth(TourCreate)} />
          <Route path="users/new" component={UserCreate} />
          <Route path="tours/:id" component={requireAuth(TourShow)} />
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
)
