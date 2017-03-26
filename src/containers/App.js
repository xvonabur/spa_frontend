import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import Promise from 'promise-polyfill'

// To add to window
if (!window.Promise) {
  window.Promise = Promise
}

class App extends Component {
  render () {
    return (
      <div>
        <h1>SPA</h1>
        <ul role="nav">
          <li><Link to="/">Home</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object
}

export default App
