import React, { Component } from 'react';
import Post from './Post.jsx';
import PostForm from './PostForm.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <Post />
        <PostForm />
      </div>
    );
  }
}
