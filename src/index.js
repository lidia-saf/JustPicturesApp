import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import "./index.css";
//Redux dependencies
import { Provider } from "react-redux";
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from "redux";
import fetch from "cross-fetch";
import "babel-polyfill";


//initial state
const initial = {
  isFetching: false, 
  pictures: [], 
  modalShown: false, 
  modalImgSrc: "",
  modalId: "",
  modalDesc: ""};

//reducer function
function reducer(state = initial, action) {
  switch(action.type) {
    case REQUEST_PICTURES:
      return Object.assign({}, state, {isFetching: true});
    case RECEIVE_PICTURES:
      const newState = Object.assign({}, state, {isFetching: false, pictures: action.pictures.map((child) => 
        { return {
          pictures: child.url,
          id: child.id,
          description: child.description
         }
        })}
      )
      console.log(newState)
      return newState;
    case SHOW_MODAL:
      return Object.assign({}, state, {
        modalShown: true, 
        modalImgSrc: action.payload.target.src, 
        modalId: action.payload.target.id,
        modalDesc: action.payload.target.description
      });
    case HIDE_MODAL:
      return Object.assign({}, state, {
        modalShown: false,
        modalImgSrc: "",
        modalId: "",
        modalDesc: ""
      })
    default:
      return state;
  }
}


//creating actions and action creators
export const REQUEST_PICTURES = 'REQUEST_PICTURES';
const RECEIVE_PICTURES = 'RECEIVE_PICTURES';
const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL'

export function requestPictures() {
  return {
    type: REQUEST_PICTURES
  }
}

function receivePictures(json) {
  return {
    type: RECEIVE_PICTURES,
    pictures: json.map(child => {
      console.log(child)
      return {
        id: child.id, 
        url: child.urls.regular, 
        description: child.description
      }
    } )
  }
}

export const showModal = event => {
  event.persist();
  return {
    type: SHOW_MODAL,
    payload: event
  }
}

export const hideModal = event => {
  event.persist();
  return {
    type: HIDE_MODAL,
    payload: event
  }
}

//export fetch
export function fetchPictures() {
  return dispatch => {
    dispatch(requestPictures())
    return fetch("https://api.unsplash.com/photos/random/?client_id=65a9c5a783bb07409623c1bb6e9763c60ff2af37bcb17b5d77089ff401659d3c&count=30&orientation=landscape&w=100")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        Promise.reject({code: response.status})
      }
    })
    .then(json => dispatch(receivePictures(json)))
  }
}

//creating the store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(thunkMiddleware))
export const store = createStore(reducer, initial, middleware);


store
  .dispatch(fetchPictures('reactjs'))
  .then(() => console.log(store.getState()))

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("root")
)