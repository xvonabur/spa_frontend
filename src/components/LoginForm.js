import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loginUser } from '../actions/UserActions'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import { intlShape, injectIntl, defineMessages } from 'react-intl'

const messages = defineMessages({
  loginHeader: {
    id: 'loginForm.loginHeader',
    defaultMessage: 'Log in to create a post'
  },
  emailPlaceholder: {
    id: 'loginForm.emailPlaceholder',
    defaultMessage: 'Email'
  },
  passwordPlaceholder: {
    id: 'loginForm.passwordPlaceholder',
    defaultMessage: 'Password'
  },
  loginButton: {
    id: 'loginForm.loginButton',
    defaultMessage: 'Log in'
  }
})

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
        <h3>{ this.props.intl.formatMessage(messages.loginHeader) }</h3>
        {this.props.statusText ? <div className='alert alert-info'>{this.props.statusText}</div> : ''}
        <Form inline>
          <FormGroup>
            <Input type="email"
                   name="email"
                   id="email"
                   placeholder={this.props.intl.formatMessage(messages.emailPlaceholder)}
                   getRef={node => {
                     this.email = node
                   }} />
          </FormGroup>
          {' '}
          <FormGroup>
            <Input type="password"
                   name="password"
                   id="password"
                   getRef={node => {
                     this.password = node
                   }}
                   placeholder={this.props.intl.formatMessage(messages.passwordPlaceholder)} />
          </FormGroup>
          {' '}
          <Button disabled={this.props.isAuthenticating} onClick={this.login}>
            {this.props.intl.formatMessage(messages.loginButton)}
          </Button>
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
  loginUser: PropTypes.func,
  intl: intlShape.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LoginForm))
