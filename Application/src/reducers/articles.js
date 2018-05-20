import Store from 'store/recipes';
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

    case 'ARTICLES_REPLACE': {
      let articles = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        articles = action.data.map(item => ({
          id: item.id,
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

      return {
        ...state,
        error: null,
        loading: false,
        articles,
      };
    }
    default:
      return state;
  }
}
