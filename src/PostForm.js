import React from 'react';

const POSTS_API_BASE_URL = 'http://localhost:3000/api';
const initialState = {
  title: '',
  body: ''
};

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(POSTS_API_BASE_URL + '/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({
        post: {
          title: this.state.title,
          body: this.state.body
        }
      })
    }).then(this.setState(initialState))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <textarea
            name="title"
            value={this.state.title}
            onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Body:
          <textarea
            name="body"
            value={this.state.body}
            onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

