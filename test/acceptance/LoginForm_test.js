/* eslint-env codeceptjs */
Feature('LoginForm')

Scenario('Login', (I) => {
  I.amOnPage('/')
  I.fillField('email', 'test@mail.com')
  I.fillField('password', '123456')

  I.click('#loginBtn')

  const nodes = ['#email', '#password']
  nodes.forEach(function (css) {
    I.dontSeeElement(css)
  })
})
