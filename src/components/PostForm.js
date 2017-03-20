import React from 'react'
import { connect } from 'react-redux'
import { setPostTitleAction, setPostBodyAction } from '../actions/PostFormActions'
import { createPost } from '../actions/PostActions'

class PostForm extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    if (name === 'title') {
      this.props.onTitleChange({ title: value })
    } else if (name === 'body') {
      this.props.onBodyChange({ body: value })
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    const title = this.props.title.trim()
    const body = this.props.body.trim()
    if (!title || !body) {
      return
    }

    this.props.onPostSubmit(this.props)
    this.props.onTitleChange({ title: '' })
    this.props.onBodyChange({ body: '' })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <textarea
            name="title"
            value={this.props.title}
            onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Body:
          <textarea
            name="body"
            value={this.props.body}
            onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    title: state.postForms.title,
    body: state.postForms.body
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    onTitleChange: (data) => dispatch(setPostTitleAction(data)),
    onBodyChange: (data) => dispatch(setPostBodyAction(data)),
    onPostSubmit: (data) => dispatch(createPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm)

PostForm.propTypes = {
  onPostSubmit: React.PropTypes.func,
  onTitleChange: React.PropTypes.func,
  onBodyChange: React.PropTypes.func,
  title: React.PropTypes.string,
  body: React.PropTypes.string
}
