import React from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions/PostActions';

class TestButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <button onClick={ this.props.handleTestClick }>Test</button>;
  }
}

const mapStateToProps = function() {
  return {};
}

const mapDispatchToProps = function(dispatch) {
  return {
    handleTestClick: () => dispatch(addPost)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestButton);