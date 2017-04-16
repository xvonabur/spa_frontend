import React, { PropTypes, Component } from 'react'
import { Provider, connect } from 'react-redux'
import { Router } from 'react-router'
import { routes } from '../routes'
import { IntlProvider, addLocaleData } from 'react-intl'
import { bindActionCreators } from 'redux'
import { changeLocale } from '../actions/LangActions'
import { currentLang } from '../util/index'
import en from 'react-intl/locale-data/en'
import ru from 'react-intl/locale-data/ru'

class Root extends Component {
  constructor (props) {
    super(props)
    this.componentWillMount = this.componentWillMount.bind(this)
    addLocaleData([...en, ...ru])
  }

  componentWillMount () {
    this.props.changeLocale(currentLang())
  }

  render () {
    const lang = currentLang()
    const messages = this.props.locale.messages

    return <Provider store={this.props.store}>
      <IntlProvider locale={lang} messages={messages} key={lang}>
        <Router history={this.props.history} routes={routes}/>
      </IntlProvider>
    </Provider>
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  changeLocale: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ changeLocale }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
