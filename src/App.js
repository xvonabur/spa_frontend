import React, { Component } from 'react';
import Post from './Post';
import PostForm from './PostForm';

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
