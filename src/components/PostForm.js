import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { submitPostForm } from '../actions/PostFormActions'
import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap'
const Dropzone = require('react-dropzone')
import { FormattedMessage } from 'react-intl'

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
      <Form onSubmit={this.handleSubmit} id="postForm">
        {
          ['Title', 'Body'].map((title, key) => {
            const lowerCaseTitle = title.toLocaleLowerCase()
            return <FormGroup row key={key}>
              <Label for={lowerCaseTitle} sm={2}>{title}</Label>
              <Col sm={10}>
                <Input type="textarea"
                       name={`post-${lowerCaseTitle}`}
                       id={lowerCaseTitle}
                       getRef={node => {
                         this[lowerCaseTitle] = node
                       }}
                       onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
          })
        }
        <Dropzone ref={ node => { this.dropzone = node } }>
          <div>
            <FormattedMessage id="postform.dropzoneHelp"
                              defaultMessage="Try dropping some files here, or click to select files to upload." />
          </div>
        </Dropzone>
        <Button getRef={ node => { this.submit = node } } id="postSubmitBtn">
          <FormattedMessage id="postform.submitButton"
                            defaultMessage="Submit" />
        </Button>
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
