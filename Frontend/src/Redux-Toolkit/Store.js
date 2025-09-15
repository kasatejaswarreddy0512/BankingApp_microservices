import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import accountReducer from "./AccountSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer

});

const store = configureStore({
  reducer: rootReducer,
});

export default store;