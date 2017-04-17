import React, { PropTypes, Component } from 'react'
import { Form, Input, FormGroup, Label } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addFilterAction, fetchPosts } from '../actions/PostActions'
import { intlShape, injectIntl, defineMessages } from 'react-intl'
import UserLanguageInput from '../components/UserLanguageInput'
import { AuthenticatedOrGuest } from '../util/index'

const messages = defineMessages({
  searchPlaceHolder: {
    id: 'sidebar.searchPlaceHolder',
    defaultMessage: 'Search...'
  },
  sortingDesc: {
    id: 'sidebar.sortingDesc',
    defaultMessage: 'desc'
  },
  sortingAsc: {
    id: 'sidebar.sortingAsc',
    defaultMessage: 'asc'
  },
  sortByPublishDateLabel: {
    id: 'sidebar.sortByPublishDateLabel',
    defaultMessage: 'Sort by publish date'
  }
})

const AuthUserLanguageInput = AuthenticatedOrGuest(UserLanguageInput)

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
                 placeholder={this.props.intl.formatMessage(messages.searchPlaceHolder)}
                 getRef={node => {
                   this.searchBox = node
                 }}
                 autoComplete="off"
                 onChange={this.handleSearchBoxChange} />
        </FormGroup>
        <FormGroup>
          <Label for="sortByDate">
            { this.props.intl.formatMessage(messages.sortByPublishDateLabel) }
          </Label>
          <Input type="select" name="select" id="sortByDate" onChange={this.handleSortingChange}
                 getRef={node => {
                   this.sortDirection = node
                 }}>
            <option/>
            <option value='desc'>
              { this.props.intl.formatMessage(messages.sortingDesc) }
            </option>
            <option value='asc'>
              { this.props.intl.formatMessage(messages.sortingAsc) }
            </option>
          </Input>
        </FormGroup>
        <AuthUserLanguageInput />
      </Form>
    )
  }
}

Sidebar.propTypes = {
  addFilterAction: PropTypes.func,
  filters: PropTypes.object,
  fetchPosts: PropTypes.func,
  intl: intlShape.isRequired
}

const mapStateToProps = (state) => {
  return {
    filters: state.posts.filters,
    token: state.auth.token,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addFilterAction, fetchPosts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Sidebar))
