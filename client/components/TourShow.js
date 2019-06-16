import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'
import fetchTour from '../queries/fetchTour'

class TourShow extends Component {

  onVoteUp(id, upvotes) {
    this.props.mutate({
      variables : { id },
      optimisticResponse: {
        __typename: 'Mutation',
        upTour: {
          id: id,
          __typename: 'TourType',
          upvotes: upvotes + 1
        }
      }
    })
  }

  render() {
    const { tour } = this.props.data

    if (!tour) { return <div>Loading...</div> }

    console.log({ tour })

    return (
      <div>
        <Link to="/">Back</Link>
        <h4>{tour.title}</h4>

        {tour.user.name&&
          <span>{tour.user.name}</span>
        }

        {tour.level.name&&
          <span> | {tour.level.name}</span>
        }
        
        <div>{tour.content}</div>
        <div className="upvotes">
          <i
            className="material-icons"
            onClick={() => this.onVoteUp(this.props.params.id, tour.upvotes)}
          >thumb_up</i>
          {tour.upvotes}
        </div>
        <CommentCreate tourId={this.props.params.id} />
        <CommentList comments={tour.comments} />
      </div>
    )
  }
}

const mutation = gql`
  mutation UpVote($id: ID) {
    upTour(id: $id) {
      id
      upvotes
    }
  }
`

export default graphql(mutation)(
  graphql(fetchTour, {
    options: (props) => { return { variables: { id: props.params.id }}}
  })(TourShow)
)
