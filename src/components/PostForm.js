import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { submitPostForm } from '../actions/PostFormActions'

class PostForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.submit.disabled = true
  }

  handleSubmit (event) {
    event.preventDefault()
    const title = this.title.value.trim()
    const body = this.body.value.trim()
    if (!title || !body) {
      return
    }

    this.props.submitPostForm(title, body, this.props.token)
    this.title.value = this.body.value = ''
    this.submit.disabled = true
  }

  handleChange () {
    this.submit.disabled = this.title.value === '' || this.body.value === ''
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
            }}
            onChange={this.handleChange}/>
        </label>
        <br />
        <label>
          Body:
          <textarea
            name="body"
            ref={node => {
              this.body = node
            }}
            onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" ref={ node => { this.submit = node } } />
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ submitPostForm }, dispatch)
}

const mapStateToProps = (state) => ({
  token: state.auth.token
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)

PostForm.propTypes = {
  submitPostForm: React.PropTypes.func,
  token: React.PropTypes.string
}
