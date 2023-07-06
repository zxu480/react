import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import searchbookSlice from "./store/searchReducer";
import wishlistSlice from "./store/wishListReducer";
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';

const createMockStore = (
  preloadedState = {
    search: {
      query: "",
      loading: false,
      books: [],
      errorMsg: "",
      totalPages: 1,
      currentPage: 1,
      pageSize: 20,
      suggestions: [],
    },
    wishList: {
      wishListBooks: [],
    },
  }
) => {
  return configureStore({
    reducer: {
      search: searchbookSlice,
      wishList: wishlistSlice,
    },
    preloadedState,
  });
};

describe("App", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test("renders home/search page by default", () => {
    render(
      <BrowserRouter>
        <Provider store={createMockStore()}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByTestId("searchpage")).toBeInTheDocument();
  });

  test("navigates to wishlist page", async () => {
    render(
      <BrowserRouter>
        <Provider store={createMockStore()}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    
    userEvent.click(screen.getByText("Wish List"))

    const wishilistEl = await screen.findByTestId("wishlist")
    expect(wishilistEl).toBeInTheDocument();
  });

});
