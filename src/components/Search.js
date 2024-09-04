import React, { useState, useEffect } from 'react';
import BooksByCategory from './BooksByCategory';
import SearchInput from './SearchInput';
import Header from './Header';
import { search } from '../BooksAPI';
import 'bulma/css/bulma.min.css';
import './Search.css';

const Search = ({ user, changeBookStatus }) => {
  const [query, setQuery] = useState('');
  const [booksByCategory, setBooksByCategory] = useState({});

  useEffect(() => {
    const getBooks = async () => {
      if (query) {
        try {
          const response = await search(query, 5000);
          const groupedBooks = groupBooksByCategory(response);
          setBooksByCategory(groupedBooks);
        } catch (error) {
          setBooksByCategory({});
        }
      } else {
        setBooksByCategory({});
      }
    };

    getBooks();
  }, [query]);

  const groupBooksByCategory = (books) => {
    return books.reduce((acc, book) => {
      const categories = book.categories || ['Uncategorized'];
      categories.forEach((category) => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(book);
      });
      return acc;
    }, {});
  };

  return (
    <React.Fragment>
      {/* Header component displayed at the top of the page */}
      <Header />
      <div className="container">
        <div className="content">
          {/* Page title and subtitle */}
          <h1 className="title is-3">📚 Find Your Next Favorite Book</h1>
          <p className="subtitle is-5">
            Search for books and explore your next read!
          </p>
          <hr />

          {/* Search input field for book search */}
          <div className="field has-addons">
            <div className="control is-expanded">
              {/* SearchInput component handles the query input */}
              <SearchInput query={query} setQuery={setQuery} />
            </div>
          </div>

          {/* BooksByCategory component displays books grouped by category */}
          <BooksByCategory
            booksByCategory={booksByCategory}
            changeBookStatus={changeBookStatus}
            user={user}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Search;
