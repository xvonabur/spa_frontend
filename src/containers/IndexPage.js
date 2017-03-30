import React, { Component } from 'react'
import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import LoginForm from '../components/LoginForm'
import { AuthenticatedOrGuest } from '../util/index'

const PostFormOrLoginForm = AuthenticatedOrGuest(PostForm, LoginForm)

export default class IndexPage extends Component {
  render () {
    return (
      <div>
        <PostList />
        <PostFormOrLoginForm />
      </div>
    )
  }
}
