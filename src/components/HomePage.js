import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Button, Title, Text, Group } from '@mantine/core';
import Header from './Header';
import InfoCard from './InfoCard';
import reading_image from '../assets/reading.png';
import books_image from '../assets/books.png';
import library_image from '../assets/library.png';
import './HomePage.css';

const cardData = [
  {
    image: reading_image,
    alt: 'A tablet computer displaying a book',
    title: 'Track Your Reading',
    description:
      'Organize your books into different categories and keep track of your reading progress seamlessly.',
  },
  {
    image: books_image,
    alt: 'A stack of books with a magnifying glass on top',
    title: 'Discover New Books',
    description:
      'Search and explore new books to add to your reading list and discover your next great read.',
  },
  {
    image: library_image,
    alt: 'A well-organized shelf of books',
    title: 'Manage Your Library',
    description:
      'Keep your library organized and easily access your collection at any time.',
  },
];

const HomePage = () => (
  <>
    <Header />
    <Container className="container">
      <Title order={1} className="title">
        Welcome to MyReads
      </Title>
      <Text size="lg" className="text">
        Track and manage your reading journey effortlessly. Categorize your
        books into "Currently Reading," "Want to Read," and "Read" shelves.
        Explore new books, manage your library, and keep track of your reading
        progress all in one place.
      </Text>

      <Group className="group">{cardData.map(InfoCard)}</Group>

      <Box>
        <Button component={Link} to="/library" size="lg" className="button">
          Go to My Library
        </Button>
        <Button
          component={Link}
          to="/search"
          size="lg"
          variant="outline"
          className="button"
        >
          Discover New Books
        </Button>
      </Box>
    </Container>
  </>
);

export default HomePage;
