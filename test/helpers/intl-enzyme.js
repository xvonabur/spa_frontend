/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import React from 'react'
import { IntlProvider, intlShape } from 'react-intl'
import { mount, shallow } from 'enzyme'

function getLocalizedIntlProvider (lang) {
  // You can pass your messages to the IntlProvider.
  const messages = require(`../../build/lang/${lang}`)
  // Create the IntlProvider to retrieve context for wrapping around.
  const intlProvider = new IntlProvider({ locale: lang, messages }, {})
  const { intl } = intlProvider.getChildContext()
  return intl
}

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp (node, lang) {
  return React.cloneElement(node, getLocalizedIntlProvider(lang))
}

export function shallowWithIntl (node, lang, { context } = {}) {
  const intl = getLocalizedIntlProvider(lang)
  return shallow(
    nodeWithIntlProp(node, lang),
    {
      context: Object.assign({}, context, { intl })
    }
  )
}

export function mountWithIntl (node, lang, { context, childContextTypes } = {}) {
  const intl = getLocalizedIntlProvider(lang)
  return mount(
    nodeWithIntlProp(node, lang),
    {
      context: Object.assign({}, context, { intl }),
      childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes)
    }
  )
}
