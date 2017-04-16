import React from 'react'
import { Link } from 'react-router'
import './Post.css'
import { FormattedDate } from 'react-intl'

const UPLOADS_URL = process.env.UPLOADS_URL

class Post extends React.Component {
  render () {
    const postDate = new Date(this.props['created-at'])
    return <div className="post">
        <h4>
          { this.props.link &&
          <Link to={this.props.link} className="post-link">{this.props.title}</Link>
          }
          { !this.props.link && this.props.title }
        </h4>
      <p className="post-date">
        <FormattedDate value={postDate} />
      </p>
      { this.props.image !== null && this.props.image.url !== null &&
        <img src={ UPLOADS_URL + this.props.image.url }/>
      }
      <p className="post-body">{this.props.body}</p>
    </div>
  }
}

Post.propTypes = {
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  'created-at': React.PropTypes.string.isRequired,
  link: React.PropTypes.string,
  image: React.PropTypes.object
}

export default Post
