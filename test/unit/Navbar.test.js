/* eslint-env jest */

import React from 'react'
import Navbar from '../../src/components/Navbar'
import configureStore from '../../src/store/configureStore'
const mockStore = configureStore
import { mountWithIntl } from '../helpers/intl-enzyme'

describe('Navbar component', () => {
  test('Russian links on navbar', function () {
    const authStatutes = [true, false]
    authStatutes.forEach((status) => {
      expectLocalisedNavLinks('ru', { auth: { isAuthenticating: status } })
    })
  })

  test('English links on navbar', function () {
    const authStatutes = [true, false]
    authStatutes.forEach((status) => {
      expectLocalisedNavLinks('en', { auth: { isAuthenticating: status } })
    })
  })
})

function expectLocalisedNavLinks (lang, store = { auth: { isAuthenticating: false } }) {
  const namesArr = {
    'ru': ['Главная', 'Github', 'ru', 'en'],
    'en': ['Home', 'Github', 'ru', 'en']
  }
  const wrapper = mountWithIntl(<Navbar store={mockStore(store)} />, lang)
  namesArr[lang].forEach((linkName) => {
    expect(wrapper.text()).toContain(linkName)
  })
}
