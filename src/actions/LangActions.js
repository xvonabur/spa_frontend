export const CHANGE_LOCALE = 'CHANGE_LOCALE'

export const changeLocaleAction = (lang, messages) => ({
  type: CHANGE_LOCALE,
  lang,
  messages
})

export const changeLocale = (lang) => {
  return (dispatch) => {
    fetch(`/dist/lang/${lang}.json`)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error('Bad response from server')
        }

        return res.json()
      })
      .then((messages) => {
        dispatch(changeLocaleAction(lang, messages))
      }).catch(err => {
        console.error(err.toString())
      })
  }
}
