import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Home from './components/pages/Home.jsx';
import Menu from './components/pages/Menu.jsx';
import Drinks from './components/pages/Drinks.jsx';
import Flavor from './components/pages/Flavor.jsx';
import Hookah from './components/pages/Hookah.jsx';
import Base from './components/pages/Base.jsx';
import Customizations from './components/pages/Customizations.jsx';

import Header from './components/Header.jsx';
// import Footer from './components/Footer';

import './App.css';

export default function App() {
  return (
    <>
      <Router>
        <div className="background"></div>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/drinks" element={<Drinks />} />
            <Route path="/menu/flavor" element={<Flavor />} />
            <Route path="/menu/flavor/hookah" element={<Hookah />} />
            <Route path="/menu/flavor/hookah/base" element={<Base />} />
            <Route path="/menu/flavor/hookah/base/customization" element={<Customizations />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </Router>
    </>
  );
}
