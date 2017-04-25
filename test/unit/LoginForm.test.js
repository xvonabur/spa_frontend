/* eslint-env jest */

import React from 'react'
import LoginForm from '../../src/components/LoginForm'
import configureStore from '../../src/store/configureStore'
const mockStore = configureStore
import { mountWithIntl } from '../helpers/intl-enzyme'

describe('LoginForm component', () => {
  const wrapper = mountWithIntl(<LoginForm store={mockStore({})} />, 'en')

  it('has email field', function () {
    expect(wrapper.find('#email')).toHaveLength(1)
  })

  it('has email password', function () {
    expect(wrapper.find('#password')).toHaveLength(1)
  })

  it('has submit button', function () {
    expect(wrapper.find('#loginBtn')).toHaveLength(1)
  })
})
