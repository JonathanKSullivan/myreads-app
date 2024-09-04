import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../BooksAPI';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import {
  MdDateRange,
  MdCategory,
  MdPerson,
  MdLibraryBooks,
  MdChildFriendly,
  MdWarning,
} from 'react-icons/md';
import './BookDetail.css';
import Header from './Header';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await get(id);
        setBook(data);
      } catch (error) {
        console.error('Failed to fetch book details:', error);
        setError('Failed to load book details.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const formatPublishedDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderRating = (averageRating) => {
    if (!averageRating) return <span>N/A</span>;

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= averageRating) {
        stars.push(<FaStar key={i} color="#FFD700" />);
      } else if (i - averageRating < 1) {
        stars.push(<FaStarHalfAlt key={i} color="#FFD700" />);
      } else {
        stars.push(<FaRegStar key={i} color="#FFD700" />);
      }
    }
    return (
      <div className="rating" style={{ textAlign: 'center' }}>
        {stars} <span>{averageRating.toFixed(1)}</span>
      </div>
    );
  };

  const renderMaturityRating = (rating) => {
    if (!rating) return null;

    if (rating === 'NOT_MATURE') {
      return (
        <p className="is-flex is-align-items-center">
          <MdChildFriendly color="green" className="mr-2" />{' '}
          <strong>Maturity Rating:</strong> Suitable for all ages
        </p>
      );
    } else if (rating === 'MATURE') {
      return (
        <p className="is-flex is-align-items-center">
          <MdWarning color="red" className="mr-2" />{' '}
          <strong>Maturity Rating:</strong> Mature content
        </p>
      );
    } else {
      return (
        <p className="is-flex is-align-items-center">
          <MdWarning color="gray" className="mr-2" />{' '}
          <strong>Maturity Rating:</strong> Unknown rating
        </p>
      );
    }
  };

  const handleAmazonSearch = (title) => {
    const query = encodeURIComponent(title);
    window.open(`https://www.amazon.com/s?k=${query}&i=stripbooks`, '_blank');
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="notification is-danger">{error}</div>;
  }

  if (!book) {
    return <div>No book details found.</div>;
  }

  return (
    <div>
      <Header />
      <div className="container book-detail">
        <div className="content mb-5">
          <h2 className="title is-3">{book.title}</h2>
          <p className="subtitle is-5">
            <MdPerson className="mr-2" />{' '}
            {book.authors?.join(', ') || 'Unknown Author'}
          </p>
        </div>

        <div className="columns is-variable is-8 is-flex-wrap-wrap">
          <div className="column is-one-third">
            {book.imageLinks?.thumbnail && (
              <figure className="image">
                <img
                  src={book.imageLinks.thumbnail}
                  alt={`${book.title} cover`}
                  className="book-cover"
                />
              </figure>
            )}

            <div className="mt-4">
              {book.categories?.length > 0 && (
                <div className="media mb-4">
                  <div className="media-left">
                    <MdCategory className="mr-2" />
                  </div>
                  <div className="media-content">
                    <strong>Categories:</strong> {book.categories.join(', ')}
                  </div>
                </div>
              )}
              {renderMaturityRating(book.maturityRating)}

              <div
                className="buttons mt-4"
                style={{ display: 'flex', gap: '1rem' }}
              >
                {book.previewLink && (
                  <a
                    className="button is-info is-outlined"
                    href={book.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📖 Preview this book
                  </a>
                )}
                {book.title && (
                  <button
                    className="button is-success"
                    onClick={() => handleAmazonSearch(book.title)}
                  >
                    🛒 Buy this book
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="column">
            <div className="box">
              {book.subtitle && (
                <h4 className="subtitle is-5 mb-4">{book.subtitle}</h4>
              )}
              {book.publisher && (
                <div className="media mb-4">
                  <div className="media-left">
                    <MdLibraryBooks className="mr-2" />
                  </div>
                  <div className="media-content">
                    <strong>Publisher:</strong> {book.publisher}
                  </div>
                </div>
              )}
              {book.publishedDate && (
                <div className="media mb-4">
                  <div className="media-left">
                    <MdDateRange className="mr-2" />
                  </div>
                  <div className="media-content">
                    <strong>Published Date:</strong>{' '}
                    {formatPublishedDate(book.publishedDate)}
                  </div>
                </div>
              )}
              {book.pageCount && (
                <div className="media mb-4">
                  <div className="media-left">
                    <span className="icon has-text-primary">📚</span>
                  </div>
                  <div className="media-content">
                    <strong>Page Count:</strong> {book.pageCount}
                  </div>
                </div>
              )}
              <div className="media mb-4" style={{ textAlign: 'center' }}>
                <div className="media-left">
                  <span className="icon has-text-warning">⭐</span>
                </div>
                <div className="media-content">
                  <strong>Average Rating:</strong>{' '}
                  {renderRating(book.averageRating)}
                </div>
              </div>
            </div>

            <div className="content mt-6" style={{ textAlign: 'left' }}>
              <h4 className="title is-4">Description</h4>
              <p>{book.description || 'No description available.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
