import React, { useState, useEffect } from 'react';
import Bookshelf from './Bookshelf';
import { get } from '../BooksAPI';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaBook, FaRegListAlt, FaRegCheckCircle } from 'react-icons/fa';
import Header from './Header';
import './Library.css'; // Import the new CSS file

const Library = ({ user, setUser, changeBookStatus, removeBook }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookDetails = await Promise.all(
          user.books.map((userBook) => get(userBook.id))
        );
        setBooks(bookDetails);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };
    fetchBooks();
  }, [user.books]);

  const filterBooksByStatus = (status) => {
    return books.filter((book) => {
      const userBook = user.books.find((ub) => ub.id === book.id);
      return userBook && userBook.status === status;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <div className="container">
        <div className="content">
          <h1 className="title is-3 has-text-centered-mobile">📚 My Library</h1>
          <hr />

          <Bookshelf
            title="Currently Reading"
            icon={<FaBook color="#3498db" />}
            books={filterBooksByStatus('Currently Reading')}
            status="Currently Reading"
            onDrop={changeBookStatus}
            removeBook={removeBook}
          />

          <Bookshelf
            title="Want to Read"
            icon={<FaRegListAlt color="#f39c12" />}
            books={filterBooksByStatus('Want to Read')}
            status="Want to Read"
            onDrop={changeBookStatus}
            removeBook={removeBook}
          />

          <Bookshelf
            title="Read"
            icon={<FaRegCheckCircle color="#2ecc71" />}
            books={filterBooksByStatus('Read')}
            status="Read"
            onDrop={changeBookStatus}
            removeBook={removeBook}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default Library;
