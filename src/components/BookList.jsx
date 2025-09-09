import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    published_year: '',
    description: ''
  });
  const [editingBook, setEditingBook] = useState(null);

  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await api.get('books/');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch authors
  const fetchAuthors = async () => {
    try {
      const res = await api.get('authors/');
      setAuthors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new book
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.author) return alert('Select an author!');
    try {
      await api.post('books/', formData);
      setFormData({ title: '', author: '', published_year: '', description: '' });
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert('Error adding book');
    }
  };

  // Edit book
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author, // this must be the author ID
      published_year: book.published_year,
      description: book.description
    });
  };

  // Update book
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.author) return alert('Select an author!');
    try {
      await api.put(`books/${editingBook.id}/`, formData);
      setEditingBook(null);
      setFormData({ title: '', author: '', published_year: '', description: '' });
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert('Error updating book');
    }
  };

  // Delete book
  const handleDelete = async (id) => {
    try {
      await api.delete(`books/${id}/`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Books</h2>

      <form onSubmit={editingBook ? handleUpdate : handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 flex-1"
          required
        />

        <select
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="border p-2 flex-1"
          required
        >
          <option value="">Select Author</option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>

        <input
          type="number"
          name="published_year"
          placeholder="Year"
          value={formData.published_year}
          onChange={handleChange}
          className="border p-2 flex-1"
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 flex-1"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingBook ? 'Update Book' : 'Add Book'}
        </button>

        {editingBook && (
          <button
            type="button"
            onClick={() => {
              setEditingBook(null);
              setFormData({ title: '', author: '', published_year: '', description: '' });
            }}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <ul>
        {books.map((b) => (
          <li key={b.id} className="mb-2 p-3 border rounded flex justify-between items-center">
            <div>
              <strong>{b.title}</strong> by {authors.find(a => a.id === b.author)?.name || 'Unknown'} ({b.book_age} yrs)
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(b)} className="bg-green-500 text-white p-1 rounded">Edit</button>
              <button onClick={() => handleDelete(b.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
