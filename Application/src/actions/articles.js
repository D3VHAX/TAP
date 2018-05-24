import api from 'lib/api';
import statusMessage from './status';
/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'ARTICLES_ERROR',
    data: message,
  })));
}


/**
  * Get Recipes
  */
export function getArticles() {
  return async dispatch => new Promise((resolve) => {
    api.get('/articles?userID=1').then(response => resolve(dispatch({
      type: 'ARTICLES_REPLACE',
      data: response,
    }))).catch(error => statusMessage(dispatch, 'error', error.message));
  });
}

export function setOpinion(data) {
  return async dispatch => new Promise((resolve) => {
    api.post('/opinion', data).catch(error => statusMessage(dispatch, 'error', error.message));
  });
}

export function getUniqueArticle() {
  return async dispatch => new Promise((resolve) => {
    api.get('/articles?userID=1&number=1').then(response => resolve(dispatch({
      type: 'ARTICLES_ADD',
      data: response,
    }))).catch(error => statusMessage(dispatch, 'error', error.message));
  });
}

export function removeArticle() {
  return async dispatch => new Promise((resolve) => {
    resolve(dispatch({
      type: 'ARTICLES_SHIFT',
      data: '',
    }));
  });
}
