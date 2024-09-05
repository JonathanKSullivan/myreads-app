import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa';
import { Button, Group, Badge, Text } from '@mantine/core';
import 'bulma/css/bulma.min.css';
import { truncateText } from '../utils/text';
import { get } from '../BooksAPI'; // Assuming get is used to fetch book details, including shelf info

const Book = ({ book, changeBookStatus }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null); // Add state for book's status

  // Function to format status into user-friendly format
  const formatStatus = (status) => {
    if (!status || status === 'none') return null;
    // Convert camelCase to Title Case (e.g., "currentlyReading" to "Currently Reading")
    return status
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  };

  // Fetch the book's shelf value when the component mounts
  useEffect(() => {
    const fetchBookStatus = async () => {
      try {
        const fetchedBook = await get(book.id); // Fetch the book's data
        setCurrentStatus(fetchedBook.shelf); // Set the shelf (status) from the fetched data
      } catch (error) {
        console.error('Failed to fetch book status:', error);
      }
    };

    fetchBookStatus(); // Call the function to fetch status
  }, [book.id]); // Run effect when the book id changes

  const handleAddToLibrary = (status) => {
    changeBookStatus(book, status);
    setCurrentStatus(status); // Update the current status in the state
    setIsAdding(false);
  };

  const formattedStatus = formatStatus(currentStatus);

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
          {formattedStatus && (
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
              {formattedStatus}
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
                onClick={() => handleAddToLibrary('wantToRead')}
              >
                Want to Read
              </Button>
              <Button
                fullWidth
                variant="light"
                size="xs"
                onClick={() => handleAddToLibrary('currentlyReading')}
              >
                Currently Reading
              </Button>
              <Button
                fullWidth
                variant="light"
                size="xs"
                onClick={() => handleAddToLibrary('read')}
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
              {formattedStatus ? 'Update Status' : 'Add to Library'}
            </Button>
          )}
        </Group>
      </div>
    </div>
  );
};

export default Book;
