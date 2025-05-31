import React, { useEffect, useState, forwardRef } from "react";
import SearchModal from "../../components/SearchModal";
import styles from "./styles.module.css";
// import { IoSearchCircleOutline } from "react-icons/io5";

{
  /* <DocSearchButton
        onTouchStart={importDocSearchModalIfNeeded}
        onFocus={importDocSearchModalIfNeeded}
        onMouseOver={importDocSearchModalIfNeeded}
        onClick={onOpen}
        ref={searchButtonRef}
        translations={translations.button}
        placeholder="d documentation"
      /> */
}

const CustomSearchButton = forwardRef(function CustomSearchButton({
  onTouchStart,
  onFocus,
  onMouseOver,
  onClick,
  translations,
  placeholder,
}, ref) {

  const [isMacOS, setIsMacOS] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Function to detect MacOS
    const userAgent = window.navigator.userAgent;
    const macPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
    setIsMacOS(macPlatforms.some(platform => userAgent.includes(platform)));
  }, []);

  // Global keyboard shortcut for search
  useEffect(() => {
    const handler = (e) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsModalOpen(true);
      }
      // Forward slash to open search (when not in input field)
      else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className={styles.searchIconButton}
        onClick={handleOpenModal}
        ref={ref}
        onTouchStart={onTouchStart}
        onFocus={onFocus}
        onMouseOver={onMouseOver}
        title="Search documentation (Ctrl+K)"
        aria-label="Search documentation">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_87_1095)">
            <path
              d="M19.4855 20.1542L13.224 13.8926C12.724 14.3183 12.149 14.6477 11.499 14.8811C10.849 15.1144 10.1958 15.2311 9.53937 15.2311C7.9377 15.2311 6.58216 14.6767 5.47274 13.5679C4.36331 12.459 3.80859 11.1042 3.80859 9.50343C3.80859 7.90263 4.363 6.54678 5.47182 5.43588C6.58064 4.32498 7.93544 3.76953 9.53624 3.76953C11.1371 3.76953 12.4929 4.32424 13.6038 5.43366C14.7147 6.54307 15.2701 7.89862 15.2701 9.50031C15.2701 10.1952 15.1471 10.8676 14.9009 11.5176C14.6548 12.1676 14.3317 12.7234 13.9317 13.1849L20.1932 19.4465L19.4855 20.1542ZM9.53937 14.2311C10.8663 14.2311 11.9865 13.7743 12.8999 12.8609C13.8134 11.9474 14.2701 10.8272 14.2701 9.50031C14.2701 8.17339 13.8134 7.0532 12.8999 6.13973C11.9865 5.22627 10.8663 4.76953 9.53937 4.76953C8.21245 4.76953 7.09226 5.22627 6.17879 6.13973C5.26534 7.0532 4.80862 8.17339 4.80862 9.50031C4.80862 10.8272 5.26534 11.9474 6.17879 12.8609C7.09226 13.7743 8.21245 14.2311 9.53937 14.2311Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_87_1095">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
      <SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
});

export default CustomSearchButton;
