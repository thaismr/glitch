import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'

const GET_CHANNEL_TEASERS = gql`
  query ChannelTeasers($id: ID!) {
    channel(id: $id) {
      teasers {
        id
        content
      }
    }
  }
`

const ChannelTeasers = ({ id }) => (
  <Query query={GET_CHANNEL_TEASERS} variables={{ id }}>
    {
      ({ loading, error, data }) => {
        if (loading) return "Loading..."
        if (error) return `Error: ${error.message}`
        if (!data.teasers) return "No teaser in this channel.."

        return (
          <Flex>
            {
              data.teasers.map(teaser => (
                <Link to={`/teaser/${teaser.id}`}>
                  {teaser.content}
                </Link>
              ))
            }
          </Flex>
        )
      }
    }
  </Query>
)

class TeaserList extends Component {
  render() {
    return (
      <Box>
        <ChannelTeasers id={this.props.channel} />
      </Box>
    )
  }
}

export default TeaserList
