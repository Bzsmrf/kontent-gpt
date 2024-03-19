import React from 'react';
import { BookOpenIcon, CurrencyDollarIcon, ChatAltIcon, UsersIcon, LightningBoltIcon, MailIcon } from '@heroicons/react/outline';

interface MenubuttonProps {
  isMenuExpanded: boolean;
  toggleMenu: () => void;
}

const Menubutton: React.FC<MenubuttonProps> = ({ isMenuExpanded, toggleMenu }) => {
  const isMobile = window.innerWidth <= 768;
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


      <div
        className={`fixed top-0 left-0 bg-gray-200 text-black min-w-56 h-screen w-${isMobile ? '3/4' : '1/5'} transform transition-transform duration-300 ${isMenuExpanded ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 text-black relative" style={{ top: isMenuExpanded ? '15px' : '15px', zIndex: 1000 }}>
          <button onClick={toggleMenu} className="text-white" title='close menu'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Options */}
        <ul className="pl-4 text-black ">
          <li className="cursor-pointer py-2 flex items-center">
            <BookOpenIcon className="h-6 w-6 mr-2" /> How To Use
          </li>
          <li className="cursor-pointer py-2 flex items-center">
            <CurrencyDollarIcon className="h-6 w-6 mr-2" /> Sponsor
          </li>
          <li className="cursor-pointer py-2 flex items-center">
            <ChatAltIcon className="h-6 w-6 mr-2" /> Feedback
          </li>
          <li className="cursor-pointer py-2 flex items-center">
            <UsersIcon className="h-6 w-6 mr-2" /> About Us
          </li>
          <li className="cursor-pointer py-2 flex items-center">
            <LightningBoltIcon className="h-6 w-6 mr-2" /> Contact Us
          </li>
          <li className="cursor-pointer py-2 flex items-center">
            <MailIcon className="h-6 w-6 mr-2" /> Bonus
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Menubutton;
