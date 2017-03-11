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
    this.getPosts = this.getPosts.bind(this);
    this.state = {posts: []}
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts() {
    fetch(process.env.API_URL + '/posts.json')
      .then((response) => {
        return response.json()
      }).then((json) => {
      return this.apiPostsToArray(json)
    }).then((array) => {
      this.setState({posts: array});
    });
  }

  apiPostsToArray(json) {
    return json['data'].map((post) => {
      return post['attributes'];
    });
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
