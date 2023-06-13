import React, { ReactNode } from "react";
import { Card } from "antd";
import { Book } from "../../store/interface";

interface BookCardProps {
  book: Book;
  operation:  ReactNode,
}

const BookCard: React.FC<BookCardProps> = ({ book, operation }) => {
  const { title, authors, imageLinks } = book;
  return (
    <Card
      hoverable
      cover={<img alt={title} src={imageLinks?.smallThumbnail || imageLinks?.thumbnail} style={{ height: 320, objectFit: "cover"}} onClick={() => {
        window.open(book.canonicalVolumeLink, '_blank')
      }} />}
      style={{ width: 240, height: 480 }}
      actions={[
        operation
      ]}
    >
      <Card.Meta title={title} description={authors ? `${authors}` : ''} style={{ height: 60, overflow: 'visible'}}/>
    </Card>
  );
};

export default BookCard;
