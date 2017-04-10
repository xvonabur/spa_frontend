import React, { PropTypes, Component } from 'react'
import { Form, Input, FormGroup, Label } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addFilterAction, fetchPosts } from '../actions/PostActions'

class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this)
    this.handleSortingChange = this.handleSortingChange.bind(this)
  }

  componentDidMount () {
    this.searchBox.value = this.props.filters.search
    this.sortDirection.value = this.props.filters.sortDirection
  }

  handleSearchBoxChange () {
    const searchValue = this.searchBox.value.trim()

    if (!searchValue || searchValue.length < 3) {
      this.props.fetchPosts(Object.assign(this.props.filters, { search: '' }))
      this.props.addFilterAction({ search: '' })
    } else {
      this.props.fetchPosts(Object.assign(this.props.filters, { search: searchValue }))
      this.props.addFilterAction({ search: searchValue })
    }
  }

  handleSortingChange (event) {
    event.preventDefault()
    const sortDirection = this.sortDirection.value

    if (!sortDirection) {
      this.props.fetchPosts(Object.assign(this.props.filters, { sortBy: '', sortDirection: '' }))
      this.props.addFilterAction({ sortBy: '' })
      this.props.addFilterAction({ sortDirection: '' })
    } else {
      this.props.fetchPosts(Object.assign(this.props.filters, { sortBy: 'created_at', sortDirection: sortDirection }))
      this.props.addFilterAction({ sortBy: 'created_at' })
      this.props.addFilterAction({ sortDirection: sortDirection })
    }
  }

  render () {
    return (
      <Form className="bd-search">
        <FormGroup>
          <Input type="text"
                 className="form-control"
                 id="search-input"
                 placeholder="Search..."
                 getRef={node => {
                   this.searchBox = node
                 }}
                 autoComplete="off"
                 onChange={this.handleSearchBoxChange} />
        </FormGroup>
        <FormGroup>
          <Label for="sortByDate">Sort by publish date</Label>
          <Input type="select" name="select" id="sortByDate" onChange={this.handleSortingChange}
                 getRef={node => {
                   this.sortDirection = node
                 }}>
            <option/>
            <option>desc</option>
            <option>asc</option>
          </Input>
        </FormGroup>
      </Form>
    )
  }
}

Sidebar.propTypes = {
  addFilterAction: PropTypes.func,
  filters: PropTypes.object,
  fetchPosts: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    filters: state.posts.filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addFilterAction, fetchPosts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
