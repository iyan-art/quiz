import React, { useState, useEffect } from 'react';

type Book = {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
};

const BookSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  const fetchBooks = async () => {
    if (!query) return;
    const res = await fetch(`https://openlibrary.org/search.json?q=${query}&page=${page}`);
    const data = await res.json();
    setBooks(data.docs);
    setTotalPages(Math.ceil(data.numFound / 100));
  };

  useEffect(() => {
    if (query) fetchBooks();
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchBooks();
  };

  const handleUpload = () => {
    if (file) {
      alert(`Pretend uploading: ${file.name}`);
      setFile(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-6">
      <h2 className="text-3xl font-bold text-indigo-600 mb-4 text-center">📚 Book Finder</h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="flex-grow p-3 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
        >
          Search
        </button>
      </form>

      <div className="mb-4">
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) setFile(e.target.files[0]);
          }}
          className="mb-2"
        />
        <button
          onClick={handleUpload}
          disabled={!file}
          className={`px-4 py-2 rounded-lg ${
            file
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Upload File
        </button>
      </div>

      <div>
        {books.map((book) => (
          <div key={book.key} className="border-b border-gray-200 py-3">
            <h3 className="text-xl font-semibold text-blue-700">{book.title}</h3>
            <p className="text-gray-600">👤 {book.author_name?.join(', ') || 'Unknown Author'}</p>
            <p className="text-sm text-gray-500">📅 {book.first_publish_year || 'N/A'}</p>
          </div>
        ))}
      </div>

      {books.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg ${
              page === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            ← Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg ${
              page === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
