import React from 'react'
import { Link, Route } from 'react-router-dom'
import classNames from 'classnames'
import tobytar from '../assets/old-toby-headshot-avatar.png'
import { Permalink } from '../assets/icons'
import PostModal from "../PostModal"

import "./style.css"

class Post extends React.Component {
  getTweetBody = (body) => {
    const ellipsis = '… '
    const link = `https://.+[ ]`
    const bodyWithEllipsis = body.split(ellipsis)
    const bodyWithLink = body.split(new RegExp(link, ""))
    if (bodyWithEllipsis.length > 1) {
      return (
        <p>{bodyWithEllipsis[0]}… <a href={bodyWithEllipsis[1]}>View Tweet</a></p>
      )
    } else if (bodyWithLink.length > 1) {
      return (
        <p>
          {bodyWithLink[0]}… <a href={bodyWithLink[1]}>View Tweet</a>
        </p>
      )
    }
    return body
  }
  getVerb = (type, owner) => {
    switch(type) {
      case 'video':
        return 'posted a video'
      case 'retweet':
        return `retweeted ${owner}`
      default:
        return 'posted'
    }
  }
  getAvatar = (post) => {
    if (post.type === 'retweet') {
      return (
        <div className="PostAvatar Retweet">
          <img alt="User's Avatar" src={post.tweet_owner_avatar} />
        </div>
      )
    }
    return (
      <div className="PostAvatar">
        <img alt="Toby's Avatar" src={tobytar} />
      </div>
    )
  }
  postClasses = () => {
    return classNames('Post',  {
      'First': this.props.first,
      'Last': this.props.last,
    })
  }
  render() {
    const { post } = this.props
    return (
      <div className={this.postClasses()}>
        {this.getAvatar(post)}
        <div className="PostMeta">Toby {this.getVerb(post.type, post.tweet_owner)}</div>
        {post.type === 'VIDEO' && (
          <div>
            <img alt="thumbnail" src={this.props.videoThumb} />
          </div>
        )}
        {post.type === 'post' && <div><p>{post.body}</p></div>}
        {post.type === 'retweet' && <div>{this.getTweetBody(post.tweet_body)}</div>}
        {this.props.children}
        <div className="PostControls">
          <Link to={post.slug}><Permalink /></Link>
        </div>
        <Route path={`/${post.slug}`} render={() =>
          <PostModal
            post={post}
            body={post.type === 'post' ? post.body : this.getTweetBody(post.tweet_body)}
            avatar={this.getAvatar(post)}
          />
        }/>
      </div>
    )
  }
}

export default Post
