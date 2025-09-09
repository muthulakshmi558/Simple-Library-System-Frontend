import React, { useEffect, useState } from 'react';
import api from '/src/api/api';

export default function AuthorList({ onAuthorSelect }) {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const fetchAuthors = async () => {
    const res = await api.get('authors/');
    setAuthors(res.data);
  };

  useEffect(() => { fetchAuthors(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('authors/', { name, bio });
    setName('');
    setBio('');
    fetchAuthors();
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-6">
      <h2 className="text-2xl font-bold mb-4">Authors</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border p-2 flex-1" required />
        <input value={bio} onChange={e => setBio(e.target.value)} placeholder="Bio" className="border p-2 flex-1" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Author</button>
      </form>
      <ul>
        {authors.map(a => (
          <li key={a.id} className="mb-2 cursor-pointer" onClick={() => onAuthorSelect(a)}>
            {a.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
