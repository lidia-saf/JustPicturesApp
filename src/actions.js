export const REQUEST_PICTURES = "REQUEST_PICTURES"
export const RECEIVE_PICTURES = "RECEIVE_PICTURES"

function requestPictures(pictures) {
  return {
    type: REQUEST_PICTURES,
    pictures
  }
}

function receivePictures(pictures, json) {
  return {
    type: RECEIVE_PICTURES,
    pictures,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPictures(pictures) {
  return dispatch => {
    dispatch(requestPictures(pictures))
    return fetch("https://api.unsplash.com/photos/random/?client_id=65a9c5a783bb07409623c1bb6e9763c60ff2af37bcb17b5d77089ff401659d3c&count=30&orientation=landscape&w=100")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          Promise.reject({code: response.status})
        }
      })
      .then(json => dispatch(receivePictures(pictures, json)))
  }
}
