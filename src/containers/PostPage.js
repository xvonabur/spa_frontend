import React, { PropTypes, Component } from 'react'
import { fetchPostById } from '../actions/PostActions'
import Post from '../components/Post'
import { connect } from 'react-redux'

class PostPage extends Component {
  render () {
    if (!this.props.post) {
      return <p>Loading...</p>
    } else {
      return (
        <Post {...this.props.post} />
      )
    }
  }

  componentWillMount () {
    this.props.fetchPost(this.props.params.id)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts.byId[ownProps.params.id]
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (id) => dispatch(fetchPostById(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage)

PostPage.propTypes = {
  fetchPost: PropTypes.func.isRequired,
  post: PropTypes.object,
  params: PropTypes.object
}
