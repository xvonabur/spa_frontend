import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateUser } from '../actions/UserActions'
import { changeLocale } from '../actions/LangActions'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { Input, FormGroup, Label } from 'reactstrap'

class UserLanguageInput extends Component {
  constructor (props) {
    super(props)
    this.handleUserLanguageChange = this.handleUserLanguageChange.bind(this)
  }

  handleUserLanguageChange (event) {
    event.preventDefault()

    const userLanguage = this.userLanguage.value
    if (userLanguage) {
      this.props.updateUser(this.props.token, this.props.userId, { locale: userLanguage })
      this.props.changeLocale(userLanguage)
    }
  }

  render () {
    return <FormGroup>
      <Label for="userLanguage">
        <FormattedMessage id="userLanguageInput.label" defaultMessage="User language" />
      </Label>
      <Input type="select" name="select" id="userLanguage" onChange={this.handleUserLanguageChange}
             getRef={node => {
               this.userLanguage = node
             }}
             value={this.props.user.locale}>
        <option>en</option>
        <option>ru</option>
      </Input>
    </FormGroup>
  }
}

UserLanguageInput.propTypes = {
  updateUser: PropTypes.func,
  changeLocale: PropTypes.func,
  intl: intlShape.isRequired,
  token: PropTypes.string,
  userId: PropTypes.number,
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    filters: state.posts.filters,
    token: state.auth.token,
    userId: state.auth.userId,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateUser, changeLocale }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserLanguageInput))
