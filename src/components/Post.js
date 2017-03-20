import React from 'react'

class Post extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    return <li>
      {this.props.title}: {this.props.body}
      <button onClick={this.handleClick}>-</button>
    </li>
  }

  handleClick () {
    this.props.onRemove({ post: { id: this.props.id } })
  }
}

Post.propTypes = {
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  onRemove: React.PropTypes.func,
  id: React.PropTypes.string
}

export default Post
