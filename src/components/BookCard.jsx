export default function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="card book-card">
      <h3>{book.title}</h3>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>Year:</strong> {book.publicationYear}
      </p>

      <div className="actions">
        <button className="btn primary" onClick={() => onEdit(book)}>
          Edit
        </button>
        <button className="btn danger" onClick={() => onDelete(book.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
