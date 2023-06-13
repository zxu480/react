import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchReducer";
import wishListReducer from "./wishListReducer";
import { SearchState, WishListState } from "./interface";

const store = configureStore<{
  search: SearchState;
  wishList: WishListState;
}>({
  reducer: {
    search: searchReducer,
    wishList: wishListReducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   console.log("default middleware", getDefaultMiddleware());
  //   return getDefaultMiddleware();
  // },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export default store;
