import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import searchbookSlice from '../../store/searchReducer';
import wishlistSlice from '../../store/wishListReducer';
import {WishListPage as Wishlist} from '..';

const createMockStore = (
  preloadedState = {
    search: {
      query: '',
      loading: false,
      books: [],
      errorMsg: '',
      totalPages: 1,
      currentPage: 1,
      pageSize: 20,
      suggestions: []
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

describe('WishListPage Test', () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });

  test('renders without errors', () => {
    render(
        <Provider store = {createMockStore()}><Wishlist />
        </Provider>);
    expect(screen.getByTestId('wishlist')).toBeInTheDocument();
  });

  test('displays correct number of books in the wishlist', () => {
    const books = [
      {id: 1, title: 'Book 1', authors: ['Author 1']},
      {id: 2, title: 'Book 2', authors: ['Author 2']},
      {id: 3, title: 'Book 3', authors: ['Author 3']},
    ];

    render(
      <Provider store = {createMockStore({
        search: {
        },
        wishList: {
          wishListBooks: books,
        },
      })}>
        <Wishlist />
        </Provider>);
    const bookElements = screen.getAllByTestId("bookitem");
    expect(bookElements.length).toBe(books.length);
  });

  test('displays book information correctly', () => {
    const book = {id: 1, title: 'Book Title', authors: ['Book Author']};

    render(
      <Provider store = {createMockStore({
        search: {
        },
        wishList: {
          wishListBooks: [book],
        },
      })}>
        <Wishlist />
      </Provider>);
    
    expect(screen.queryByText(book.title)).toBeInTheDocument();
  });

  test('handles removal of a book from the wishlist', async () => {
    const books = [{id: 1, title: 'Book Title', authors: ['Book Author']}];

    render(
      <Provider store = {createMockStore({
        search: {
        },
        wishList: {
          wishListBooks: books,
        },
      })}>
        <Wishlist />
      </Provider>);
    await userEvent.click(screen.getByTestId("removebutton"));
    expect(screen.queryByTestId("bookitem")).not.toBeInTheDocument();
  });
});
