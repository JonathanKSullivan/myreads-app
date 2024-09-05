import Bookshelf from './Bookshelf';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaBook, FaRegListAlt, FaRegCheckCircle } from 'react-icons/fa';
import Header from './Header';
import './Library.css'; // Import the new CSS file

const Library = ({ changeBookStatus, removeBook, books, setBooks }) => {
  const filterBooksByStatus = (status) => {
    return books.filter((book) => {
      return book.shelf === status;
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
            books={filterBooksByStatus('currentlyReading')}
            status="currentlyReading"
            onDrop={changeBookStatus}
            removeBook={removeBook}
          />

          <Bookshelf
            title="Want to Read"
            icon={<FaRegListAlt color="#f39c12" />}
            books={filterBooksByStatus('wantToRead')}
            status="wantToRead"
            onDrop={changeBookStatus}
            removeBook={removeBook}
          />

          <Bookshelf
            title="Read"
            icon={<FaRegCheckCircle color="#2ecc71" />}
            books={filterBooksByStatus('read')}
            status="read"
            onDrop={changeBookStatus}
            removeBook={removeBook}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default Library;
