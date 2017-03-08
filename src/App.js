import React, { Component } from 'react';
import PostList from './PostList';
import PostForm from './PostForm';

export default class App extends Component {
  render() {
    return (
      <div>
        <PostList />
        <PostForm />
      </div>
    );
  }
}
