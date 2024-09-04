import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import BookDetail from './components/BookDetail';
import Library from './components/Library';
import Search from './components/Search';
import HomePage from './components/HomePage';

function App() {
  const initialUserState = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    books: [],
  };

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    let initialUser;
    try {
      initialUser = savedUser ? JSON.parse(savedUser) : initialUserState;
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      initialUser = initialUserState;
    }
    return initialUser;
  });

  const changeBookStatus = (selectedBook, newStatus) => {
    const bookExists = user.books.some((book) => book.id === selectedBook.id);

    let updatedBooks;
    if (bookExists) {
      updatedBooks = user.books.map((book) =>
        book.id === selectedBook.id ? { ...book, status: newStatus } : book
      );
    } else {
      updatedBooks = [
        ...user.books,
        { id: selectedBook.id, status: newStatus },
      ];
    }

    const updatedUser = { ...user, books: updatedBooks };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const removeBook = (bookId) => {
    const updatedBooks = user.books.filter((book) => book.id !== bookId);
    const updatedUser = { ...user, books: updatedBooks };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/library"
          element={
            <Library
              user={user}
              setUser={setUser}
              changeBookStatus={changeBookStatus}
              removeBook={removeBook}
            />
          }
        />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route
          path="/search"
          element={<Search user={user} changeBookStatus={changeBookStatus} />}
        />
      </Routes>
    </div>
  );
}

export default App;
