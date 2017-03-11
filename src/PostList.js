import React from 'react';
import Post from './Post';
import 'whatwg-fetch';

export default class PostList extends React.Component {
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

  render() {
    let postsToRender = this.state.posts.concat(this.props.posts);
    return (
      <ul>
        {postsToRender.map((post, index) => <Post key={index} {...post} />)}
      </ul>
    );
  }
}