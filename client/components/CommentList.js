import React, { Component } from 'react'

class CommentList extends Component {

  renderComments() {
    return this.props.comments.map( ({ id, content }) => {
      return (
        <li key={id} className="collection-item">
          {content}
        </li>
      )
    })
  }

  render() {
    return(
      <ul className="collection">
        {this.renderComments()}
      </ul>
    )
  }
}

export default CommentList
