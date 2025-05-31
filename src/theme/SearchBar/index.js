import React, { useState } from 'react';
import SearchModal from '../../components/SearchModal';
import CustomSearchButton from './CustomSearchButton';

export default function SearchBar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <CustomSearchButton onClick={handleOpenModal} />
            <SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
} 