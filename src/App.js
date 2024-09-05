import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import BookDetail from './components/BookDetail';
import Library from './components/Library';
import Search from './components/Search';
import { getAll, update } from './BooksAPI';

function App() {
  const [books, setBooks] = useState([]);

  // Function to fetch books and set state
  const fetchBooks = async () => {
    try {
      const bookDetails = await getAll();
      console.log('Fetched books:', bookDetails);
      setBooks(bookDetails);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

  // Fetch books on initial load
  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to change book status and refresh the list
  const changeBookStatus = async (selectedBook, newStatus) => {
    try {
      await update(selectedBook, newStatus);
      // Refetch books after update
      fetchBooks();
    } catch (error) {
      console.error('Failed to update book status:', error);
    }
  };

  // Function to remove a book and refresh the list
  const removeBook = async (selectedBook) => {
    try {
      await update(selectedBook, 'none'); // Move the book to 'none' category (remove)
      // Refetch books after removal
      fetchBooks();
    } catch (error) {
      console.error('Failed to delete book status:', error);
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Library
              changeBookStatus={changeBookStatus}
              removeBook={removeBook}
              books={books}
              setBooks={setBooks}
            />
          }
        />
        <Route
          path="/library"
          element={
            <Library
              changeBookStatus={changeBookStatus}
              removeBook={removeBook}
              books={books}
              setBooks={setBooks}
            />
          }
        />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route
          path="/search"
          element={<Search changeBookStatus={changeBookStatus} />}
        />
      </Routes>
    </div>
  );
}

export default App;
