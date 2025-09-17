import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import accountReducer from "./AccountSlice";
import transactionReducer from "./TransactionSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  transaction: transactionReducer

});

const store = configureStore({
  reducer: rootReducer,
});

export default store;