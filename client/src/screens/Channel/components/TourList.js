import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'

const GET_CHANNEL_TOURS = gql`
   query ChannelTours($id: ID!) {
     channel(id: $id) {
       tours {
         id
         title
         content
       }
     }
   }
`

const ChannelTours = ({ id }) => (
  <Query query={GET_CHANNEL_TOURS} variables={{ id }}>
    {
      ({ loading, error, data }) => {
        if (loading) return "Loading..."
        if (error) return `Error: ${error.message}`

        if (!data.tours) return "No Tours in this Channel, yet."

        return (
          <Flex>
            {
              data.tours.map(tour => (
                <Box>
                  <Link to={`/tour/${tour.id}`}>{tour.title}</Link>
                  <Box>{tour.content}</Box>
                </Box>
              ))
            }
          </Flex>
        )
      }
    }
  </Query>
)

class TourList extends Component {
  render() {
    return (
      <Box>
        <ChannelTours id={this.props.channel} />
      </Box>
    )
  }
}

export default TourList
