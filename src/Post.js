import React from 'react';

class Post extends React.Component {
  render() {
    return <li>{this.props.title}: {this.props.body}</li>;
  }
}

Post.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired
}

export default Post;