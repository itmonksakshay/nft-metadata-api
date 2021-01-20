import { createStore,combineReducers,applyMiddleware } from "redux"; 

import thunk from 'redux-thunk';
import {loadContract,loadWeb3} from "../reducers";

const rootReducer = combineReducers({
  contract: loadContract,
  web3: loadWeb3
});

const store = createStore(rootReducer);

export default store;
