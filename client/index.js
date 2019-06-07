import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import TourList from './components/TourList'

const client = new ApolloClient({})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <TourList />
    </ApolloProvider>
  )
}

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
)
