import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaTrashAlt } from 'react-icons/fa';
import 'bulma/css/bulma.min.css';
import { useDrag } from 'react-dnd';
import { truncateText } from '../utils/text';

const DraggableBook = ({ book, removeBook }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'BOOK',
    item: { id: book.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      className="card is-hoverable"
      ref={drag}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '180px',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        overflow: 'hidden',
      }}
    >
      <div className="card-image" style={{ flex: '1 0 auto' }}>
        <figure className="image is-4by5" style={{ margin: 0 }}>
          <img
            src={book.imageLinks.thumbnail}
            alt={`${book.title} cover`}
            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
          />
        </figure>
      </div>

      <div
        className="card-content"
        style={{ flex: '1 1 auto', padding: '10px', overflow: 'hidden' }}
      >
        <div className="media" style={{ flexDirection: 'column' }}>
          <div className="media-content">
            <p
              className="title is-6 has-text-weight-semibold"
              style={{
                height: 'auto',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
                textAlign: 'left', // Align text to the left
                margin: 0,
                padding: 0,
              }}
              title={book.title}
            >
              {truncateText(book.title, 50)}{' '}
              {/* Truncate title to a max length */}
            </p>
            <p
              className="subtitle is-7 has-text-grey-dark"
              style={{
                height: '20px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                textAlign: 'left', // Align text to the left
                margin: 0, // Remove margin
                padding: 0, // Remove padding
              }}
            >
              {book.authors?.join(', ') || 'Unknown Author'}
            </p>
          </div>
        </div>
      </div>

      <div className="content" style={{ flex: '0 1 auto', padding: '10px' }}>
        <Link
          to={`/book/${book.id}`}
          className="button is-link is-fullwidth is-small"
        >
          <span className="icon">
            <FaBookOpen />
          </span>
          <span>View Details</span>
        </Link>
        <button
          className="button is-danger is-fullwidth is-small mt-2"
          onClick={() => removeBook(book)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaTrashAlt style={{ marginRight: '5px' }} />
          Delete Book
        </button>
      </div>
    </div>
  );
};

export default DraggableBook;
