import React from 'react';
import Post from './Post';

export default class PostList extends React.Component {
  render() {
    let posts = [
      {id: 1, name: 'First post', description: 'This is the first post.'},
      {id: 2, name: 'Second post', description: 'This is the second post.'},
      {id: 3, name: 'Third post', description: 'This is the third post.'}
    ]; 
    return (
      <ul>
        {posts.map((post) => <Post key={post.id} {...post} />)}
      </ul>
    );
 }
}