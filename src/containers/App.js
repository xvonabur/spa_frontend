import React, { PropTypes, Component } from 'react'
import Promise from 'promise-polyfill'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import Sidebar from './Sidebar'
import { FormattedMessage } from 'react-intl'
import Navbar from './../components/Navbar'
import './App.css'

// To add to window
if (!window.Promise) {
  window.Promise = Promise
}

class App extends Component {
  render () {
    return (
      <div>
        <Navbar/>
        <div className="bd-pageheader">
          <Container>
            <h1>SPA</h1>
            <p className="lead">
              <FormattedMessage id="app.headerLead"
                                defaultMessage="Single Page Application Example"/>
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
