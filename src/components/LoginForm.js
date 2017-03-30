import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loginUser } from '../actions/UserActions'

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
        <form role='form'>
          <div>
            <input type='text'
                   ref={node => {
                     this.email = node
                   }}
                   placeholder='Email' />
          </div>
          <div>
            <input type='password'
                   ref={node => {
                     this.password = node
                   }}
                   placeholder='Password' />
          </div>
          <button type='submit'
                  disabled={this.props.isAuthenticating}
                  onClick={this.login}>Log in</button>
        </form>
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
