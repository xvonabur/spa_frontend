import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { submitPostForm } from '../actions/PostFormActions'
import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap'
const Dropzone = require('react-dropzone')

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
    const image = this.dropzone.state.acceptedFiles[0]
    if (!title || !body) {
      return
    }

    this.props.submitPostForm(title, body, this.props.token, image)
    this.title.value = this.body.value = ''
    this.submit.disabled = true
  }

  handleChange () {
    this.submit.disabled = this.title.value === '' || this.body.value === ''
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Label for="title" sm={2}>Title</Label>
          <Col sm={10}>
            <Input type="textarea"
                   name="text"
                   id="title"
                   getRef={node => {
                     this.title = node
                   }}
                   onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="body" sm={2}>Body</Label>
          <Col sm={10}>
            <Input type="textarea"
                   name="text"
                   id="body"
                   getRef={node => {
                     this.body = node
                   }}
                   onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <Dropzone ref={ node => { this.dropzone = node } }>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <Button getRef={ node => { this.submit = node } }>Submit</Button>
      </Form>
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
