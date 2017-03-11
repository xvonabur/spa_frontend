import React, { Component } from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import Promise from 'promise-polyfill';

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {posts: []}
  }

  addPost(post) {
    this.setState({posts: this.state.posts.concat(post)});
  }

  render() {
    return (
      <div>
        <PostList posts={this.state.posts} />
        <PostForm onPostSubmit={(post) => this.addPost(post)} />
      </div>
    );
  }
}
