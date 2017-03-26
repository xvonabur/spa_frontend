import React from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { removePost, fetchPosts } from '../actions/PostActions'
import 'whatwg-fetch'

class PostList extends React.Component {
  componentDidMount () {
    this.props.fetchPosts()
  }

  render () {
    if (this.props.hasErrored) {
      return <p>These aren't the posts you're looking for...</p>
    } else {
      return (
        <div>
          <ul>
            {this.props.posts.map((post) =>
              <li key={post.id}>
                <Post {...post} link={`/posts/${post.id}`} />
                <button onClick={() => this.props.removePost({ post: { id: post.id } })}>-</button>
              </li>
            )}
          </ul>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.allIds.map(id => state.posts.byId[id]),
    hasErrored: state.posts.reqResult.hasErrored
  }
}

const mapDispatchToProps = (dispatch) => ({
  removePost: (data) => dispatch(removePost(data)),
  fetchPosts: () => dispatch(fetchPosts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)

PostList.propTypes = {
  removePost: React.PropTypes.func,
  posts: React.PropTypes.array,
  hasErrored: React.PropTypes.bool,
  fetchPosts: React.PropTypes.func
}
