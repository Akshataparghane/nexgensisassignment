import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};

export const createBook = async (book) => {
  const response = await api.post("/books", book);
  return response.data;
};

export const updateBook = async (id, book) => {
  const response = await api.put(`/books/${id}`, book);
  return response.data;
};

export const deleteBook = async (id) => {
  await api.delete(`/books/${id}`);
};
