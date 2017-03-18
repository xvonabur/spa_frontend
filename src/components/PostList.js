import React from 'react';
import Post from './Post';
import PostForm from './PostForm';
import TestButton from './TestButton';
import 'whatwg-fetch';

const BASE_URL = process.env.API_URL;

export default class PostList extends React.Component {
  constructor(props) {
    super(props)
    this.getPosts = this.getPosts.bind(this);
    this.addPost = this.addPost.bind(this)
    this.state = {posts: []}
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts() {
    fetch(`${BASE_URL}/posts.json`)
    .then((response) => {
      return response.json()
    }).then((json) => {
      return json['data'].map((post) => { return this.extractPostAttrs(post); })
    }).then((array) => {
      this.setState({posts: array});
    }).catch(err => {
      console.error(err.toString())
    });
  }

  extractPostAttrs(post) {
    post['attributes']['id'] = post['id'];
    return post['attributes'];
  }

  addPost(data) {
    fetch(`${BASE_URL}/posts.json`, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      return response.json()
    }).then((json) => {
      console.log('json', json);
      return this.extractPostAttrs(json['data'])
    }).then(post => {
      this.setState({ posts: this.state.posts.concat([post]) })
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.posts.map((post) => <Post key={post.id} {...post} />)}
        </ul>
        <PostForm onPostSubmit={this.addPost} />
        <TestButton />
      </div>
    );
  }
}