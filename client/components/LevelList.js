import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'

const GET_LEVELS = gql`
  {
    levels {
      id
      name
      exp
      description
      channels {
        id
        name
      }
    }
  }
`

const Wrapper = styled(Flex)`
  justify-content: center;
`

const Levels = () => (
  <Query query={GET_LEVELS}>
  {
    ({ loading, error, data }) => {
      if (loading) return "Loading..."
      if (error) return `Error: ${error.message}`

      return (
        <Flex>
          {
            data.levels.map(level => (
              <Box key={level.id}>
                <Link to={`/level/${level.id}`}>{level.name}</Link>
                <Box>{level.description}</Box>
              </Box>
            ))
          }
        </Flex>
      )
    }
  }
  </Query>
)

class LevelList extends Component {
  render() {
    return (
      <Flex>
        <Levels />
      </Flex>
    )
  }
}

export default LevelList
