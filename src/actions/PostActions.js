export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const POST_REQ_HAS_ERRORED = 'POST_REQ_HAS_ERRORED'
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const ADD_FILTER = 'ADD_FILTER'
export const REMOVE_FILTER = 'REMOVE_FILTER'

const BASE_URL = process.env.API_URL
const API_VERSION = process.env.API_VERSION
const API_CONTENT_TYPE = process.env.API_CONTENT_TYPE
const ACCEPT_HEADER = `${API_CONTENT_TYPE}; version=2${API_VERSION}`

export const addPostAction = (post) => ({
  type: ADD_POST,
  post
})

export const removePostAction = (postObj) => ({
  type: REMOVE_POST,
  post: {
    id: postObj.id
  }
})

export const postReqHasErroredAction = (bool) => ({
  type: POST_REQ_HAS_ERRORED,
  hasErrored: bool
})

export const fetchPostsAction = (response) => ({
  type: FETCH_POSTS,
  posts: response['pagePosts'],
  total: response['meta']['total'],
  limit: response['meta']['limit'],
  currentPage: response['page']
})

export const fetchPostAction = (post) => ({
  type: FETCH_POST,
  post
})

export const addFilterAction = (filter) => ({
  type: ADD_FILTER,
  name: Object.keys(filter)[0],
  value: Object.values(filter)[0]
})

export const removeFilterAction = (filter) => ({
  type: REMOVE_FILTER,
  name: Object.keys(filter)[0]
})

function extractPostAttrs (post) {
  post['attributes']['id'] = post['id']
  return post['attributes']
}

const postsUrl = (options) => {
  let basePostsUrl = `${BASE_URL}/posts.json?`
  const currentPage = parseInt(options.page)
  basePostsUrl += `page[number]=${currentPage}`

  if (options.search) {
    basePostsUrl += `&search=${String(options.search)}`
  }
  if (options.sortBy && options.sortDirection) {
    basePostsUrl += `&sort_by=${String(options.sortBy)}&sort_direction=${String(options.sortDirection)}`
  }
  return basePostsUrl
}

export const fetchPosts = (options = {}) => {
  return (dispatch) => {
    options.page = parseInt(options.page) || 1
    fetch(postsUrl(options), {
      headers: {
        'Accept': ACCEPT_HEADER,
        'Content-Type': API_CONTENT_TYPE
      }
    })
      .then((response) => {
        return response.json()
      }).then((json) => {
        return {
          'pagePosts': json['data'].map((post) => { return extractPostAttrs(post) }),
          'meta': json['meta'],
          'page': options.page
        }
      }).then((hash) => {
        dispatch(fetchPostsAction(hash))
      }).catch(err => {
        console.error(err.toString())
        dispatch(postReqHasErroredAction(true))
      })
  }
}

export const fetchPostById = (id) => {
  return (dispatch) => {
    fetch(`${BASE_URL}/posts/${id}.json`, {
      headers: {
        'Accept': ACCEPT_HEADER,
        'Content-Type': API_CONTENT_TYPE
      }
    })
      .then((response) => {
        return response.json()
      }).then((json) => {
        return extractPostAttrs(json['data'])
      }).then((post) => {
        dispatch(fetchPostAction(post))
      }).catch(err => {
        console.error(err.toString())
        dispatch(postReqHasErroredAction(true))
      })
  }
}

export const createPost = (data, token) => {
  let formData = new FormData()

  for (let name in data.post) {
    formData.append(`post[${name}]`, data.post[name])
  }

  return (dispatch) => {
    fetch(`${BASE_URL}/posts.json`, {
      method: 'POST',
      headers: {
        'Accept': ACCEPT_HEADER,
        'Authorization': `Bearer ${token}`
      },
      body: formData
    }).then(response => {
      return response.json()
    }).then((json) => {
      return extractPostAttrs(json['data'])
    }).then(post => {
      dispatch(addPostAction(post))
    }).catch(err => {
      dispatch(postReqHasErroredAction(true))
      console.error(err.toString())
    })
  }
}

export const removePost = (data, token) => {
  return (dispatch) => {
    fetch(`${BASE_URL}/posts/${data.post.id}.json`, {
      method: 'DELETE',
      headers: {
        'Accept': ACCEPT_HEADER,
        'Content-Type': API_CONTENT_TYPE,
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      dispatch(removePostAction(data.post))
    }).catch(err => {
      dispatch(postReqHasErroredAction(true))
      console.error(err.toString())
    })
  }
}
