import React, { useState } from 'react';
import AuthorList from './components/AuthorList';
import BookList from './components/BookList';

function App() {
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">Library System</header>
      <AuthorList onAuthorSelect={setSelectedAuthor} />
      <BookList selectedAuthor={selectedAuthor} />
    </div>
  );
}

export default App;
