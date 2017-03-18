import React from 'react'

const initialState = {
  title: '',
  body: ''
}

export default class PostForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = initialState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const title = this.state.title.trim()
    const body = this.state.body.trim()
    if (!title || !body) {
      return
    }
    this.props.onPostSubmit(this.state)
    this.setState(initialState)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <textarea
            name="title"
            value={this.state.title}
            onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Body:
          <textarea
            name="body"
            value={this.state.body}
            onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

PostForm.propTypes = {
  onPostSubmit: React.PropTypes.func
}
