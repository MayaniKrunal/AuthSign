import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from "../Store/reducers";

const store = createStore(rootReducer, {}, applyMiddleware(thunk));


export default store;