import React from 'react';
import Post from './Post';
import 'whatwg-fetch';

export default class PostList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.posts.map((post, index) => <Post key={index} {...post} />)}
      </ul>
    );
  }
}