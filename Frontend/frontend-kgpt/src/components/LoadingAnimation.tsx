import React from 'react';
import './LoadingAnimation.css'; // Import CSS file for styling

const LoadingAnimation: React.FC = () => {
    return (
        <div className="loading-container">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
    );
};

export default LoadingAnimation;
