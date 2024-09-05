import React from 'react';
import { Link } from 'react-router-dom';
import { Burger, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FaBook } from 'react-icons/fa';
import './Header.css'; // Import the CSS file

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <FaBook size="1.5em" className="navbar-icon" />
          <Text size="xl" color="white" weight={700}>
            My Reads
          </Text>
        </Link>
        <Burger
          opened={opened}
          onClick={toggle}
          className="navbar-burger"
          aria-label="menu"
          aria-expanded={opened}
        />
      </div>

      <div
        id="navbarMenu"
        className={`navbar-menu ${opened ? 'is-active' : ''}`}
      >
        <div className="navbar-end">
          <div className="navbar-item">
            <Link to="/search" className="navbar-item">
              <Text size="md" color="white" weight={500}>
                Search
              </Text>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
