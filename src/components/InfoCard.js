import React from 'react';
import { Box, Title, Text, Image, Card } from '@mantine/core';
import './InfoCard.css'; // Import the new CSS file

// InfoCard component to display individual cards with image, title, and description
const InfoCard = ({ image, alt, title, description }) => (
  <Card className="card">
    <Card.Section>
      <Image src={image} alt={alt} height={200} withPlaceholder />
    </Card.Section>
    <Box mt="md">
      <Title order={4} className="card-title">
        {title}
      </Title>
      <Text size="sm" color="dimmed" mt="xs">
        {description}
      </Text>
    </Box>
  </Card>
);

export default InfoCard;
