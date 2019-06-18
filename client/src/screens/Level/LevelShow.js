import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'

const GET_LEVEL = gql`
  query Level($id: ID!) {
    level(id: $id) {
      id
      name
      channels {
        id
        name
      }
    }
  }
`
const Level = ({ id }) => (
  <Query query={GET_LEVEL} variables={{ id }}>
    {
      ({ loading, error, data }) => {
        if (loading) return "Loading..."
        if (error) return `Error: ${error.message}`

        return (
          <Flex>
            <Box>{data.level.name}</Box>
            <Box>{data.level.description}</Box>
            {
              data.level.channels.map(channel => (
                <Box key={channel.id}>
                  <Link to={`/channel/${channel.id}`}>{channel.name}</Link>
                </Box>
              ))
            }
          </Flex>
        )
      }
    }
  </Query>
)

class LevelShow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Flex>
        <Level id={this.props.match.params.id} />
      </Flex>
    )
  }
}

export default LevelShow
