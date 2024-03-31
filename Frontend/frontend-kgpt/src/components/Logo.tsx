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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="grey" className="w-8 h-8">
                  <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                </svg>



              </button>
            </Link>


          </div>

        </div>
      </nav>
    </div>
  );
};

export default Logo;
