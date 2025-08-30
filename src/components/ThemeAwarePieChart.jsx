import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

const ThemeAwarePieChart = ({ className, ...props }) => {
    const { colorMode } = useColorMode();

    // Choose the appropriate video source based on the current theme
    const videoSrc = colorMode === 'dark'
        ? '/img/Pie_Chart_Dark.webm'
        : '/img/Pie_Chart_Light.webm';

    return (
        <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className={className}
            alt="Core Layer Token Distribution Chart"
            {...props}
        >
            Your browser does not support the video element.
        </video>
    );
};

export default ThemeAwarePieChart; 