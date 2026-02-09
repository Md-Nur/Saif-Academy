import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userAuthReducer from "./features/userAuth/userAuthSlice";

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      userAuth: userAuthReducer,
    }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
