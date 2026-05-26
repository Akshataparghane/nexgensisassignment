import BookCard from "./BookCard";

export default function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="message">No books found.</p>;
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
