import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default: localStorage if
// web, AsyncStorage if react-native
import thunk from 'redux-thunk';
import reducers from 'reducers';

// Redux Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['null'],
};

let reducer = null;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'test') {
  reducer = combineReducers(reducers);
} else {
  reducer = persistCombineReducers(persistConfig, reducers);
}


const middleware = [thunk];


const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const configureStore = () => {
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  const persistor = persistStore(
    store,
    null,
    () => { store.getState(); },
  );

  return { persistor, store };
};

export default configureStore;
