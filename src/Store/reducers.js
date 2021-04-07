import { combineReducers } from "redux";

import userReducer from "../Store/reducers/userReducers";

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
