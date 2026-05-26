import { useEffect, useState } from "react";

const initialState = {
  title: "",
  author: "",
  genre: "",
  publicationYear: "",
};

export default function BookForm({ onSubmit, editingBook, onCancel }) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title || "",
        author: editingBook.author || "",
        genre: editingBook.genre || "",
        publicationYear: editingBook.publicationYear || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingBook) setFormData(initialState);
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{editingBook ? "Edit Book" : "Add New Book"}</h2>

      <div className="grid">
        <input
          className="input"
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          type="number"
          name="publicationYear"
          placeholder="Publication Year"
          value={formData.publicationYear}
          onChange={handleChange}
          required
        />
      </div>

      <div className="actions">
        <button className="btn primary" type="submit">
          {editingBook ? "Update Book" : "Add Book"}
        </button>

        {editingBook && (
          <button className="btn secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
