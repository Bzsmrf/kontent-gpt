import React, { useState } from 'react';
import ChatBar from './components/ChatBar';
import Menubutton from './components/Menubutton';
import Logo from './components/Logo';


const App: React.FC = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  return (
    <div className="h-screen bg-gray-100">

      <Menubutton isMenuExpanded={isMenuExpanded} toggleMenu={toggleMenu} />
      <Logo isMenuExpanded={isMenuExpanded} />
      <ChatBar />
    </div>
  );
};

export default App;
