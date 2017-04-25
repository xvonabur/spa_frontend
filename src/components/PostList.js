import React from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { removePost, fetchPosts, addFilterAction } from '../actions/PostActions'
import 'whatwg-fetch'
import './Post.css'
import { Button } from 'reactstrap'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'

class PostList extends React.Component {
  constructor (props) {
    super(props)
    this.handlePageClick = this.handlePageClick.bind(this)
  }

  componentDidMount () {
    this.props.fetchPosts(this.props.filters)
  }

  handlePageClick (pageNumber) {
    this.props.fetchPosts(Object.assign(this.props.filters, { page: pageNumber }))
    this.props.addFilterAction({ page: pageNumber })
  }

  render () {
    if (this.props.hasErrored) {
      return <p>These aren't the posts you're looking for...</p>
    } else {
      return (
        <div>
          {this.props.posts.map((post) =>
            <div key={post.id} className="post-wrapper">
              <Post {...post} link={`/posts/${post.id}`} />
              { post['user-id'] === this.props.userId && post['user-id'] !== null &&
              <Button color="danger" onClick={() => this.props.removePost({ post: { id: post.id } }, this.props.token)}
                className="post-remove-btn">
                Delete
              </Button>
              }
              <hr/>
            </div>
          )}
          <Pagination onChange={this.handlePageClick} current={this.props.currentPage} total={this.props.totalPosts}
                      pageSize={this.props.perPage} />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.allIds.map(id => state.posts.byId[id]),
    hasErrored: state.posts.reqResult.hasErrored,
    token: state.auth.token,
    userId: state.auth.userId,
    currentPage: state.posts.pagination.currentPage,
    totalPosts: state.posts.pagination.total,
    perPage: state.posts.pagination.limit,
    filters: state.posts.filters
  }
}

const mapDispatchToProps = (dispatch) => ({
  removePost: (data, token) => dispatch(removePost(data, token)),
  fetchPosts: (options) => dispatch(fetchPosts(options)),
  addFilterAction: (filter) => dispatch(addFilterAction(filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)

PostList.propTypes = {
  removePost: React.PropTypes.func,
  posts: React.PropTypes.array,
  hasErrored: React.PropTypes.bool,
  fetchPosts: React.PropTypes.func,
  token: React.PropTypes.string,
  userId: React.PropTypes.number,
  currentPage: React.PropTypes.number,
  totalPosts: React.PropTypes.number,
  perPage: React.PropTypes.number,
  filters: React.PropTypes.object,
  addFilterAction: React.PropTypes.func
}
