import React from 'react'
import { Link } from 'react-router-dom'
import { distanceInWords } from 'date-fns'

import "./style.css"

class PostModal extends React.Component {
  getTime = () => {
    if (this.props.post.type === 'retweet') {
      return distanceInWords(this.props.post.tweet_created, new Date())
    }
    return distanceInWords(this.props.post.created, new Date())
  }
  render() {
    const { body, avatar, post } = this.props
    console.log(post)
    return (
      <div className="PostModal">
        <div className="ModalBody">
          <div className="PostMeta clearfix">
            {avatar}
            <p>
              {post.tweet_owner ?
                <span><a href={`https://twitter.com/${post.tweet_owner}`}>@{post.tweet_owner}</a> tweeted<br /></span> :
                <span>Toby posted<br /></span>}
              {this.getTime()} ago
            </p>
          </div>
          <div className="PostBody">
            {body}
          </div>
          <Link to="/" className="Close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.98 212.98"><path d="M131.8 106.5l75.94-75.95a17.9 17.9 0 1 0-25.31-25.3l-75.94 75.93L30.55 5.24a17.9 17.9 0 1 0-25.3 25.31l75.93 75.94-75.94 75.94a17.9 17.9 0 0 0 25.31 25.3l75.94-75.93 75.94 75.94a17.9 17.9 0 1 0 25.31-25.31l-75.94-75.94z" fillRule="evenodd" clipRule="evenodd" id="Close" /></svg>
          </Link>
        </div>
      </div>
    )
  }
}

export default PostModal
