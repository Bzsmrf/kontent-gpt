import React from 'react';
import './WelcomeBanner.css';

interface WelcomeBannerProps {
  displayName: string | null;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ displayName }) => {
  return (
    <div className="relative">
      <p className="welcome-banner text-center">
        {displayName ? `${displayName}` : ''} Welcome to KontentGPT
      </p>
    </div>
  );
};

export default WelcomeBanner;
