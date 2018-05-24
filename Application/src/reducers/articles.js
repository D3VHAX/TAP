import Store from 'store/articles';
import Logos from '../images/publishers';

export const initialState = Store;

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case 'FAVOURITES_REPLACE': {
      return {
        ...state,
        favourites: action.data || [],
      };
    }
    case 'ARTICLES_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }

    case 'ARTICLES_ADD': {
      let article = {};
      if (action.data && typeof action.data === 'object') {
        article = {
          id: action.data.system_id,
          title: action.data.title,
          description: action.data.description,
          categories: action.data.categories,
          picture: action.data.picture,
          publisher: action.data.publisher,
          keywords: action.data.keywords,
          date: action.data.creationDate,
          logo: Logos[action.data.publisher],
          url: action.data.url,
          stats: action.data.stats,
        };
      }

      return {
        ...state,
        articles: [...state.articles, article],
      };
    }

    case 'ARTICLES_REPLACE': {
      let articles = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        articles = action.data.map(item => ({
          id: item.system_id,
          title: item.title,
          description: item.description,
          categories: item.categories,
          picture: item.picture,
          publisher: item.publisher,
          keywords: item.keywords,
          date: item.creationDate,
          logo: Logos[item.publisher],
          url: item.url,
          stats: item.stats,
        }));
      }

      if (state.init === true) {
        return {
          ...state,
          error: null,
          loading: false,
          init: false,
          articles,
        };
      }
    }
    default: return state;
  }
}
