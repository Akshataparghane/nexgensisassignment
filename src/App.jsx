import { useEffect, useMemo, useState } from "react";
import { createBook, deleteBook, getBooks, updateBook } from "./api/booksApi";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import SearchFilter from "./components/SearchFilter";

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError("Failed to load books. Make sure the API server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(books.map((book) => book.genre))];
    return uniqueGenres.sort();
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGenre = genreFilter === "All" || book.genre === genreFilter;

      return matchesSearch && matchesGenre;
    });
  }, [books, searchTerm, genreFilter]);

  const handleSubmit = async (formData) => {
    try {
      setError("");

      if (editingBook) {
        await updateBook(editingBook.id, formData);
        setEditingBook(null);
      } else {
        await createBook(formData);
      }

      await fetchBooks();
    } catch (err) {
      setError("Something went wrong while saving the book.");
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmDelete) return;

    try {
      setError("");
      await deleteBook(id);
      await fetchBooks();
    } catch (err) {
      setError("Something went wrong while deleting the book.");
    }
  };

  const handleCancel = () => {
    setEditingBook(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Book Management System</h1>
        <p>Manage books with add, edit, delete, search, and filter features.</p>
      </header>

      <BookForm
        onSubmit={handleSubmit}
        editingBook={editingBook}
        onCancel={handleCancel}
      />

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
        genres={genres}
      />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <BookList
          books={filteredBooks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
