export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const POST_REQ_HAS_ERRORED = 'POST_REQ_HAS_ERRORED'
export const FETCH_ALL_POSTS = 'FETCH_ALL_POSTS'
export const FETCH_POST = 'FETCH_POST'

const BASE_URL = process.env.API_URL

export const addPostAction = (postObj) => ({
  type: ADD_POST,
  post: {
    id: postObj.id,
    title: postObj.title,
    body: postObj.body
  }
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

export const fetchAllPostsAction = (response) => ({
  type: FETCH_ALL_POSTS,
  response
})

export const fetchPostAction = (post) => ({
  type: FETCH_POST,
  post
})

function extractPostAttrs (post) {
  post['attributes']['id'] = post['id']
  return post['attributes']
}

export const fetchPosts = () => {
  return (dispatch) => {
    fetch(`${BASE_URL}/posts.json`)
      .then((response) => {
        return response.json()
      }).then((json) => {
        return json['data'].map((post) => { return extractPostAttrs(post) })
      }).then((array) => {
        dispatch(fetchAllPostsAction(array))
      }).catch(err => {
        console.error(err.toString())
        dispatch(postReqHasErroredAction(true))
      })
  }
}

export const fetchPostById = (id) => {
  return (dispatch) => {
    fetch(`${BASE_URL}/posts/${id}.json`)
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
  return (dispatch) => {
    fetch(`${BASE_URL}/posts.json`, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
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
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
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
