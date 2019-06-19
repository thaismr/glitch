import React, { useState, useCallback } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import { useTransition, animated } from 'react-spring'
import TourList from './components/TourList'
import TeaserList from './components/TeaserList'

const AnimatedBox = styled(animated(Box))`
  background: 'lightorange';
`

const Channel = (props) => {
    const [page, setPage] = useState(0)
    const channel = props.match.params.id

    const transitions = useTransition(page, p => p, {
      from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
      enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
      leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    })

    return (
      <Flex>
        <Box>
          <Box onClick={useCallback(() => setPage(0),[page])}>Tours</Box>
          <Box onClick={useCallback(() => setPage(1),[page])}>Teasers</Box>
        </Box>
        {
          transitions.map(({ item, props, key }) => {
            switch (item) {
              case 0:
                return <AnimatedBox style={props} key={key}><TourList channel={channel} /></AnimatedBox>
                break
              case 1:
                return <AnimatedBox style={props} key={key}><TeaserList channel={channel} /></AnimatedBox>
                break
            }
          })
        }
      </Flex>
    )

}

export default Channel
