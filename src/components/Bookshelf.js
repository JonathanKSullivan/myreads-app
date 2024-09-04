import React from 'react';
import DraggableBook from './DraggableBook';
import { Box, Title, Divider } from '@mantine/core';
import { useDrop } from 'react-dnd';

const Bookshelf = ({ title, icon, books, status, onDrop, removeBook }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'BOOK',
    drop: (item) => onDrop(item, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Box
      className="bookshelf"
      my="lg"
      ref={drop}
      style={{
        backgroundColor: isOver ? '#f0f0f0' : 'transparent',
        padding: '1rem',
        borderRadius: '8px',
      }}
    >
      <Title order={2} mb="md" align="left">
        {icon} {title}
      </Title>
      <Divider my="sm" />

      <Box
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          gap: '16px',
        }}
      >
        {books.map((book) => (
          <Box key={book.id} style={{ flex: '0 0 auto' }}>
            <DraggableBook book={book} removeBook={removeBook} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Bookshelf;
