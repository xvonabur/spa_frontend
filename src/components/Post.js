import React from 'react'
import { Link } from 'react-router'

class Post extends React.Component {
  render () {
    if (this.props.link) {
      return <Link to={this.props.link}>
        {this.props.title}: {this.props.body}
      </Link>
    } else {
      return <div>
        {this.props.title}: {this.props.body}
      </div>
    }
  }
}

Post.propTypes = {
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  link: React.PropTypes.string
}

export default Post
