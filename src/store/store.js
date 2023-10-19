import {compose , createStore , applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {persistStore ,persistReducer} from 'redux-persist';
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const middleWares = [process.env.NODE_ENV!=='production' && logger,thunk].filter(Boolean);

const persistConfig ={
    key:'root', 
    storage,
    whiteList: ['cart']
}
const persistedReducer = persistReducer(persistConfig,rootReducer);

const composeEnhancer = (process.env.NODE_ENV !=='production' &&  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composeEnhancers=composeEnhancer(applyMiddleware(...middleWares));

export const store=createStore(persistedReducer,undefined,composeEnhancers);
export const persistor = persistStore(store);