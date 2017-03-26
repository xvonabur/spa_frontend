import React, { Component } from 'react'
import PostList from '../components/PostList'
import PostForm from '../components/PostForm'

export default class IndexPage extends Component {
  render () {
    return (
      <div>
        <PostList />
        <PostForm />
      </div>
    )
  }
}
