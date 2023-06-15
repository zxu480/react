import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Book, SearchState } from "./interface";

const initialState: SearchState = {
  query: "",
  loading: false,
  books: [],
  errorMsg: null,
  totalPages: 1,
  currentPage: 1,
  pageSize: 20,
};

const searchSlice = createSlice<SearchState, SliceCaseReducers<SearchState>>({
  name: "search",
  initialState,
  reducers: {
    updateQuery(state: SearchState, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    updateCurrentPage(state: SearchState, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state: SearchState) => {
        state.loading = true;
        state.errorMsg = null;
      })
      .addCase(
        searchBooks.fulfilled,
        (
          state: SearchState,
          action: PayloadAction<{ books: Book[]; totalItems: number }>
        ) => {
          const { totalItems, books } = action.payload;
          state.loading = false;
          state.books = books;
          // manually set a max total pages, because api will not return same total item number 
          state.totalPages = Math.min(Math.ceil(totalItems / state.pageSize), 20);
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
  async (_args: undefined, thunkAPI: any) => {
    const { query, currentPage, pageSize } = thunkAPI.getState().search;
    const startIndex = (currentPage - 1) * pageSize 
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=20`
    );
    console.log(response.data);
    const { totalItems, items = [] } = response.data;
    // console.log(totalItems)
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
    return { books, totalItems };
  }
);

export default searchSlice.reducer;
export const { updateQuery, updateCurrentPage } = searchSlice.actions;
