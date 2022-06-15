import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import {loadDataFromStorage, clearDataFromStorage} from '../utils/asyncStorage';
import {
  createNetworkMiddleware,
  offlineActionCreators,
  checkInternetConnection,
} from 'react-native-offline';
import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { offline } from '@redux-offline/redux-offline';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

// clearDataFromStorage(); 
const initialState = {
  
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk];

let store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);
let persistor = persistStore(store);
export {store, persistor};

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware)),
// );
