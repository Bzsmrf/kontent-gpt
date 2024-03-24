import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatBar from './components/ChatBar';
import Menubutton from './components/Menubutton';
import Logo from './components/Logo';
import HowToUse from './components/howtouse';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUS';
import SingUp from './components/SingUp';

const App: React.FC = () => {
  const [isMenuExpanded, setIsMenuExpanded] = React.useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  return (
    <Router>
      <div className="h-screen bg-gray-100">
        <Menubutton isMenuExpanded={isMenuExpanded} toggleMenu={toggleMenu} />
        <Logo isMenuExpanded={isMenuExpanded} />
        <Routes>
          <Route path="/howtouse" element={<HowToUse />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/" element={<ChatBar />} />
          <Route path="/signup" element={<SingUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
