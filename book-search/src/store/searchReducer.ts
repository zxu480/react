import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Book, SearchState } from "./interface";

const initialState: SearchState = {
  loading: false,
  books: [],
  errorMsg: null,
};

const searchSlice = createSlice<SearchState, SliceCaseReducers<SearchState>>({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state: SearchState) => {
        state.loading = true;
        state.errorMsg = null;
      })
      .addCase(
        searchBooks.fulfilled,
        (state: SearchState, action: PayloadAction<Book[]>) => {
          state.loading = false;
          state.books = action.payload;
          state.errorMsg = null;
        }
      )
      .addCase(searchBooks.rejected, (state: SearchState, action) => {
        state.loading = false;
        state.errorMsg = action.error.message ?? null;
      });
  },
});

export const searchBooks = createAsyncThunk(
  "search/searchBooks",
  async (query: string) => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=20`
    );
    const items = response.data.items ?? [];
    const books: Book[] = items.map(
      ({ id, volumeInfo }: { id: string; volumeInfo: any }) => ({
        id,
        authors: volumeInfo?.authors,
        averageRating: volumeInfo?.averageRating,
        canonicalVolumeLink: volumeInfo?.canonicalVolumeLink,
        imageLinks: volumeInfo?.imageLinks,
        title: volumeInfo?.title,
      })
    );
    console.log(books);
    return books;
  }
);

export default searchSlice.reducer;
