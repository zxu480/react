import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { removeFromWishList } from "../../store/wishListReducer";
import { RootState } from "../../store";
import { Book } from "../../store/interface";
import { responsiveCols } from "../SearchPage/SearchPage";
import { BookCard } from "..";

const WishlistPage: React.FC = () => {
  const dispatch = useDispatch();
  const books: Book[] = useSelector(
    (state: RootState) => state.wishList.wishListBooks
  );

  const handleRemoveFromWishlist = useCallback((bookId: string) => {
    dispatch(removeFromWishList(bookId));
  }, []);

  return (
    <div data-testid="wishlist">
      <Row gutter={[16, 16]}>
        {books.map((book) => (
          <Col data-testid={"bookitem"} key={book.id} {...responsiveCols}>
              <BookCard
                book={book}
                operation={
                  <MinusCircleOutlined data-testid={"removebutton"}
                    onClick={() => handleRemoveFromWishlist(book.id)}
                  />
                }
              />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WishlistPage;
