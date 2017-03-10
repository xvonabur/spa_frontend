import React, { Component } from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import Promise from 'promise-polyfill';

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

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
