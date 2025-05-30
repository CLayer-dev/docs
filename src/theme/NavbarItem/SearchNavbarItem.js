import React, { useState } from 'react';
import NavbarSearch from '@theme/Navbar/Search';
import SearchModal from '../../components/SearchModal';

export default function SearchNavbarItem({ mobile, className }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (mobile) {
    return null;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <NavbarSearch className={className}>
        <button
          onClick={handleOpenModal}
          className="navbar__link"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 'var(--ifm-navbar-item-padding-vertical) var(--ifm-navbar-item-padding-horizontal)',
            color: 'var(--ifm-navbar-link-color)',
            fontSize: 'var(--ifm-navbar-link-font-size)',
            fontWeight: 'var(--ifm-navbar-link-font-weight)',
            textDecoration: 'none'
          }}
        >
          Search
        </button>
      </NavbarSearch>

      <SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
