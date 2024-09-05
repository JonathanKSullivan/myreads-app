import { Box, Title, Paper, Text } from '@mantine/core';
import Book from './Book';
import './BooksByCategory.css';

const BooksByCategory = ({ booksByCategory, changeBookStatus }) => {
  return (
    <>
      {Object.keys(booksByCategory).length === 0 && (
        <Text align="center" color="dimmed">
          No books found for your search.
        </Text>
      )}

      {Object.keys(booksByCategory).map((category) => (
        <Paper key={category} withBorder shadow="md" p="md" radius="md" mt="xl">
          <Title order={3} mb="md">
            {category}
          </Title>
          <Box className="books-container">
            {booksByCategory[category].map((book) => (
              <Box key={book.id} className="book-item">
                <Book book={book} changeBookStatus={changeBookStatus} />
              </Box>
            ))}
          </Box>
        </Paper>
      ))}
    </>
  );
};

export default BooksByCategory;
