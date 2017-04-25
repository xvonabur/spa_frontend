/* eslint-env codeceptjs */
Feature('PostForm')

Scenario('Remove post', (I) => {
  login(I)
  createPost('New post title1', 'New post body1', I)

  I.click('.post-remove-btn')

  I.dontSee('New post title1')
  I.dontSee('New post body1')
})

Scenario('Add post', (I) => {
  login(I)

  createPost('New post title', 'New post body', I)

  I.dontSeeInField('post-title', 'New post title')
  I.dontSeeInField('post-body', 'New post body')
  I.see('New post title')
  I.see('New post body')
})

const login = (I) => {
  I.amOnPage('/')
  I.fillField('email', 'test@mail.com')
  I.fillField('password', '123456')
  I.click('#loginBtn')
}

const createPost = (title, body, I) => {
  I.fillField('post-title', title)
  I.fillField('post-body', body)
  I.click('#postSubmitBtn')
}
