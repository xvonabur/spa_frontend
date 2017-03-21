import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { submitPostForm } from '../actions/PostFormActions'

class PostForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const title = this.title.value.trim()
    const body = this.body.value.trim()
    if (!title || !body) {
      return
    }

    this.props.submitPostForm(title, body)
    this.title.value = this.body.value = ''
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <textarea
            name="title"
            ref={node => {
              this.title = node
            }}/>
        </label>
        <br />
        <label>
          Body:
          <textarea
            name="body"
            ref={node => {
              this.body = node
            }}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({ submitPostForm }, dispatch)
}

export default connect(null, mapDispatchToProps)(PostForm)

PostForm.propTypes = {
  submitPostForm: React.PropTypes.func
}
