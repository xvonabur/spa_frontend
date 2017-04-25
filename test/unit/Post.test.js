/* eslint-env jest */

import React from 'react'
import Post from '../../src/components/Post'
import configureStore from '../../src/store/configureStore'
const mockStore = configureStore
import { mountWithIntl } from '../helpers/intl-enzyme'

describe('Post', () => {
  const wrapper = mountWithIntl(
    <Post store={mockStore({})}
          link={'https://google.com'}
          key={1}
          title={'Long title'}
          body={'Long body'}
          image={ { url: 'https://google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' } }
          created-at={'2017-03-08T19:08:51.993Z'}/>,
    'en'
  )

  it('has right title', () => {
    expect(wrapper.find('.post-link').text()).toContain('Long title')
  })

  it('has right link', () => {
    expect(wrapper.exists('a.post-link[href="https://google.com"]'))
  })

  it('has right date', () => {
    expect(wrapper.find('.post-date').text()).toContain('3/8/2017')
  })

  it('has right body', () => {
    expect(wrapper.find('.post-body').text()).toContain('Long body')
  })
})
