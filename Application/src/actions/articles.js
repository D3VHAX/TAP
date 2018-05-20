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
    api.get('/articles').then(response => resolve(dispatch({
      type: 'ARTICLES_REPLACE',
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
