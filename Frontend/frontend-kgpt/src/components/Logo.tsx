import React, { useState } from 'react';
import brandLogo from '../assets/logo/brand_logo1.png';
import { Link } from 'react-router-dom';

interface LogoProps {
  isMenuExpanded: boolean;
  toggleMenu: () => void;
}

const Logo: React.FC<LogoProps> = ({ isMenuExpanded, toggleMenu }) => {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div>
      <div className="logo" style={{ position: 'absolute', top: '25px', left: (isMobile ? (isMenuExpanded ? '11%' : '60px') : (isMenuExpanded ? '15%' : '60px')), transition: 'left 0.3s ease-in-out', zIndex: 1000 }}>
        <a href="/">
          <img src={brandLogo} alt="KontentGpt Logo" style={{ width: '100px', height: 'auto' }} />
        </a>
      </div>
      <nav className="bg-white border-gray-200 dark:bg-gray-100 fixed top-0 right-0 z-50">
        <div className="flex items-center justify-between  mt-8 p-4">

          <div className="flex items-center space-x-1">
            <Link to="/signup" className='cursor-pointer'>
              <button type="button" onClick={toggleUserMenu} className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" style={{ position: 'fixed', right: '20px', top: '20px' }}>
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
              </button>
            </Link>


          </div>

        </div>
      </nav>
    </div>
  );
};

export default Logo;
