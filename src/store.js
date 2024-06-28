import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import productReducer from './component/Homepage/store/reducer';

// Combine reducers
const rootReducer = combineReducers({
    products: productReducer,
});

// Create store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;