import React from 'react';
import Post from './Post';
import 'whatwg-fetch';

export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.getPosts = this.getPosts.bind(this);
    this.state = {posts: []};
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
        this.setState({ posts: array });
      });
  }

  apiPostsToArray(json) {
    return json['data'].map((post) => {
      post['attributes']['id'] = parseInt(post['id']);
      return post['attributes'];
    });
  }

  render() {
    return (
      <ul>
        {this.state.posts.map((post) => <Post key={post.id} {...post} />)}
      </ul>
    );
  }
}