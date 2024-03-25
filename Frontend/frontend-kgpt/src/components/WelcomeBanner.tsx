import React from 'react';
import './WelcomeBanner.css';

interface WelcomeBannerProps {
  email: string | null;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ email }) => {
  return (
    <div className="relative">
      <p className="welcome-banner text-center">
        <strong>Welcome to KontentGPT</strong>
      </p>
    </div>
  );
};

export default WelcomeBanner;
