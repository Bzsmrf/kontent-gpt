import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, UsersIcon, LightningBoltIcon } from '@heroicons/react/outline';

interface MenubuttonProps {
  isMenuExpanded: boolean;
  toggleMenu: () => void;
}

const Menubutton: React.FC<MenubuttonProps> = ({ isMenuExpanded, toggleMenu }) => {
  const isMobile = window.innerWidth <= 768;
  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }
  return (
    <div className="fixed top-4 left-4 z-10">
      <button
        className="text-black bg-gray-100 rounded-full p-2 transition duration-300 ease-in-out hover:bg-gray-200"
        onClick={toggleMenu}
        title="Expand Menu"
      >
        {isMenuExpanded ? (
          ''
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>

      <div className={`fixed top-0 left-0 bg-gray-200 text-black min-w-56 h-screen w-${isMobile ? '3/4' : '1/5'} transform transition-transform duration-300 ${isMenuExpanded ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 text-black relative" style={{ top: isMenuExpanded ? '15px' : '15px', zIndex: 1000 }}>
          <button onClick={toggleMenu} className="text-white" title='close menu'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="pl-4 text-black ">
          <Link to="/howtouse" className="cursor-pointer py-2 flex items-center">
            <li className="flex flex-row">
              <BookOpenIcon className="h-6 w-6 mr-2" /> How To Use
            </li>
          </Link>
          <Link to="/aboutus" className="cursor-pointer py-2 flex items-center">
            <li className="cursor-pointer py-2 flex items-center">
              <UsersIcon className="h-6 w-6 mr-2" /> About Us
            </li>
          </Link>
          <Link to="/contactus" className="cursor-pointer py-2 flex items-center">
            <li className="cursor-pointer py-2 flex items-center">
              <LightningBoltIcon className="h-6 w-6 mr-2" /> Contact Us
            </li>
          </Link>
          <Link to="/signup">
            <li onClick={logout} className="cursor-pointer py-2 flex items-center">
              <LightningBoltIcon className="h-6 w-6 mr-2" /> logout
            </li>
          </Link>

        </ul>
      </div>
    </div>
  );
};

export default Menubutton;
