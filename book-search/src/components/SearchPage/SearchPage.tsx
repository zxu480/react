import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchBooks } from "../../store/searchReducer";
import { addToWishList } from "../../store/wishListReducer";
import { AppThunkDispatch, RootState } from "../../store";
import { Book } from "../../store/interface";
import BookCard from "../BookCard/BookCard";
import { Col, Row, Input, Alert, Spin } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

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
  const loading: boolean = useSelector(
    (state: RootState) => state.search.loading
  );
  const errorMsg: string | null = useSelector(
    (state: RootState) => state.search.errorMsg
  );

  const handleSearch = useCallback((query: string) => {
    dispatch(searchBooks(query));
  }, []);

  const handleAddToWishList = useCallback((book: Book) => {
    dispatch(addToWishList(book));
  }, []);

  return (
    <div>
      <div>
        <Input.Search
          placeholder="input search text"
          onSearch={(query) => handleSearch(query)}
          style={{ width: 360 }}
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
    </div>
  );
};

export default SearchPage;
