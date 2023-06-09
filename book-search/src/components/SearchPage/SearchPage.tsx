import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchBooks,
  updateCurrentPage,
  updateQuery,
  updateSuggestions,
} from "../../store/searchReducer";
import { addToWishList } from "../../store/wishListReducer";
import { AppThunkDispatch, RootState } from "../../store";
import { Book } from "../../store/interface";
import { Col, Row, Input, Alert, Spin } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { BookCard, Pagination, SearchBar } from "..";

export const responsiveCols = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 6,
};

const SearchPage: React.FC = () => {
  const dispatch = useDispatch<AppThunkDispatch>();

  const books: Book[] = useSelector((state: RootState) => state.search.books);
  const suggestions: string[] = useSelector((state: RootState) => state.search.suggestions)
  const loading: boolean = useSelector(
    (state: RootState) => state.search.loading
  );
  const errorMsg: string | null = useSelector(
    (state: RootState) => state.search.errorMsg
  );
  const totalPages: number = useSelector(
    (state: RootState) => state.search.totalPages
  );

  const currentPage: number = useSelector(
    (state: RootState) => state.search.currentPage
  );

  const pageSize: number = useSelector(
    (state: RootState) => state.search.pageSize
  );

  const handleInputChange = useCallback((value: string) => {
    dispatch(updateQuery(value));
    dispatch(updateSuggestions())
  }, [])

  const handleSearch = useCallback(() => {
    dispatch(searchBooks());
  }, []);

  const handleAddToWishList = useCallback((book: Book) => {
    dispatch(addToWishList(book));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    dispatch(updateCurrentPage(page));
    dispatch(searchBooks());
  }, []);

  return (
    <div data-testid="searchpage">
      <div>
        {/* <Input.Search
          placeholder="input search text"
          onSearch={(query) => handleSearch(query)}
          style={{ width: 360 }}
        /> */}
        <SearchBar
          onInputChange={handleInputChange}
          onSearch={handleSearch}
          suggestions={suggestions}
        />
        <div style={{ height: 60, display: "flex", alignItems: "center" }}>
          {loading && <Spin size="large" />}
          {errorMsg && <Alert message={errorMsg} type="error" closable />}
        </div>
      </div>
      <Row gutter={[16, 16]}>
        {books.map((book) => (
          <Col key={book.id} {...responsiveCols}>
            <BookCard
              book={book}
              operation={
                <PlusCircleOutlined onClick={() => handleAddToWishList(book)} />
              }
            />
          </Col>
        ))}
      </Row>
      <Pagination
        pageSize={pageSize}
        current={currentPage}
        total={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchPage;
