import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa';
import { Button, Group, Badge, Text } from '@mantine/core';
import 'bulma/css/bulma.min.css';

const Book = ({ book, changeBookStatus, user = { books: [] } }) => {
  const [isAdding, setIsAdding] = useState(false);

  // Check if the book is already in the user's library
  const userBook = user.books.find((userBook) => userBook.id === book.id);
  const currentStatus = userBook ? userBook.status : null;

  const handleAddToLibrary = (status) => {
    changeBookStatus(book, status);
    setIsAdding(false);
  };

  // Truncate description with a line clamp
  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      className="card is-hoverable"
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '180px',
        cursor: 'pointer',
        overflow: 'hidden',
        height: 'auto',
      }}
    >
      <div className="card-image" style={{ flex: '1 0 auto' }}>
        {book.imageLinks?.thumbnail ? (
          <figure className="image is-4by5" style={{ margin: 0 }}>
            <img
              src={book.imageLinks.thumbnail}
              alt={`${book.title} cover`}
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
            />
          </figure>
        ) : (
          <figure
            className="image is-4by5"
            style={{
              margin: 0,
              backgroundColor: '#e0e0e0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FaBookOpen size={48} color="#7f8c8d" />
          </figure>
        )}
      </div>

      <div className="card-content" style={{ padding: '10px' }}>
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
            {!isAdding && (
              <Text
                size="sm"
                color="dimmed"
                style={{
                  marginTop: '8px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3, // Limits description to 3 lines
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                  textAlign: 'left', // Align text to the left
                  margin: 0, // Remove margin
                  padding: 0, // Remove padding
                }}
              >
                {truncateText(book.description, 100)}
              </Text>
            )}
          </div>
          {currentStatus && (
            <Badge
              color="green"
              mt="xs"
              style={{
                backgroundColor: '#006400',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '0.75rem',
                marginTop: '10px',
              }}
            >
              {currentStatus}
            </Badge>
          )}
        </div>
      </div>

      <div className="content" style={{ padding: '10px' }}>
        <Link
          to={`/book/${book.id}`}
          className="button is-link is-fullwidth is-small"
        >
          <span className="icon">
            <FaBookOpen />
          </span>
          <span>View Details</span>
        </Link>
        <Group mt="md" position="center">
          {isAdding ? (
            <Group direction="column" grow>
              <Button
                fullWidth
                variant="light"
                size="xs"
                onClick={() => handleAddToLibrary('Want to Read')}
              >
                Want to Read
              </Button>
              <Button
                fullWidth
                variant="light"
                size="xs"
                onClick={() => handleAddToLibrary('Currently Reading')}
              >
                Currently Reading
              </Button>
              <Button
                fullWidth
                variant="light"
                size="xs"
                onClick={() => handleAddToLibrary('Read')}
              >
                Read
              </Button>
              <br />
              <Button
                fullWidth
                variant="outline"
                size="xs"
                color="red"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
            </Group>
          ) : (
            <Button variant="light" size="xs" onClick={() => setIsAdding(true)}>
              {currentStatus ? 'Update Status' : 'Add to Library'}
            </Button>
          )}
        </Group>
      </div>
    </div>
  );
};

export default Book;
