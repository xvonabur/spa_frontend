import React, { PropTypes, Component } from 'react'
import Promise from 'promise-polyfill'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col
} from 'reactstrap'
import Sidebar from './Sidebar'
import './App.css'

// To add to window
if (!window.Promise) {
  window.Promise = Promise
}

class App extends Component {
  render () {
    return (
      <div>
        <Navbar light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <Collapse navbar>
            <Nav className="container" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/xvonabur/spa_frontend">Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="bd-pageheader">
          <Container>
            <h1>SPA</h1>
            <p className="lead">
              Single Page Application Example
            </p>
          </Container>
        </div>
        <Container>
          <Row>
            <Col md={{size: 3, push: 9}} className="col-12 bd-sidebar">
              <Sidebar />
            </Col>
            <Col md={{size: 9, pull: 3}} className="col-12 bd-content">
              {this.props.children}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object
}

export default App
