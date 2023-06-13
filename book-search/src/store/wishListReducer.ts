import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { Book, WishListState } from "./interface";

const initialState: WishListState = { wishListBooks: [] };

const wishListSlice = createSlice<
  WishListState,
  SliceCaseReducers<WishListState>
>({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList(state: WishListState, action: PayloadAction<Book>) {
      if (state.wishListBooks.some(({ id }) => id === action.payload.id))
        return;
      state.wishListBooks.push(action.payload);
    },
    removeFromWishList(state: WishListState, action: PayloadAction<string>) {
      state.wishListBooks = state.wishListBooks.filter(
        ({ id }) => id !== action.payload
      );
    },
  },
});

export default wishListSlice.reducer;
export const { addToWishList, removeFromWishList } = wishListSlice.actions;
