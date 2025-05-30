import React, { useState } from 'react';
import NavbarSearch from '@theme/Navbar/Search';
import SearchModal from '../../components/SearchModal';
import CustomSearchButton from '../SearchBar/CustomSearchButton';

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
    <NavbarSearch className={className}>
      <CustomSearchButton onClick={handleOpenModal} />
      <SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </NavbarSearch>
  );
}
