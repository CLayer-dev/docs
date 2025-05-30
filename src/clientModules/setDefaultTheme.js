// This module runs only on the client side to set the default theme
export default function setDefaultTheme() {
    // Only run on first visit (when no theme preference is stored)
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const currentTheme = localStorage.getItem('theme');

        // If no theme is stored, set it to light
        if (!currentTheme) {
            localStorage.setItem('theme', 'light');
            // Set the data-theme attribute
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
} 