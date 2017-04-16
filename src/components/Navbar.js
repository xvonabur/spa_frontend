import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { changeLocale } from '../actions/LangActions'
import { connect } from 'react-redux'
import {
  Collapse,
  Navbar as BootNavBar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import { FormattedMessage } from 'react-intl'

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.handleChangeLang = this.handleChangeLang.bind(this)
  }

  handleChangeLang (event) {
    event.preventDefault()
    console.log('content', event.target.text)
    this.props.changeLocale(event.target.text)
  }

  render () {
    return (
      <BootNavBar light toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <Collapse navbar>
          <Nav className="container" navbar>
            <NavItem>
              <NavLink href="/">
                <FormattedMessage
                  id="navbar.navLink.home"
                  defaultMessage="Home" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/xvonabur/spa_frontend">Github</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.handleChangeLang}>ru</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="" onClick={this.handleChangeLang}>en</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </BootNavBar>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ changeLocale }, dispatch)
}

Navbar.propTypes = {
  changeLocale: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
