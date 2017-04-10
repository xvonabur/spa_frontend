import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loginUser } from '../actions/UserActions'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.login = this.login.bind(this)
  }

  login (e) {
    e.preventDefault()
    const email = this.email.value.trim()
    const password = this.password.value.trim()
    if (!email || !password) {
      return
    }
    this.props.loginUser(this.email.value, this.password.value)
  }

  render () {
    return (
      <div>
        <h3>Log in to create a post</h3>
        {this.props.statusText ? <div className='alert alert-info'>{this.props.statusText}</div> : ''}
        <Form inline>
          <FormGroup>
            <Label for="email" hidden>Email</Label>
            <Input type="email"
                   name="email"
                   id="email"
                   placeholder="Email"
                   getRef={node => {
                     this.email = node
                   }} />
          </FormGroup>
          {' '}
          <FormGroup>
            <Label for="password" hidden>Password</Label>
            <Input type="password"
                   name="password"
                   id="password"
                   getRef={node => {
                     this.password = node
                   }}
                   placeholder='Password' />
          </FormGroup>
          {' '}
          <Button disabled={this.props.isAuthenticating} onClick={this.login}>Log in</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loginUser }, dispatch)
}

LoginForm.propTypes = {
  isAuthenticating: PropTypes.bool,
  statusText: PropTypes.string,
  loginUser: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
