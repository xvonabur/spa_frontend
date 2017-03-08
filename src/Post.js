import React from 'react';

class Post extends React.Component {
  render() {
    return <li>{this.props.name}: {this.props.description}</li>;
  }
}

Post.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired
}

export default Post;