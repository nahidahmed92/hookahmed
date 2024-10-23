import { useState } from 'react';
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
import { CartProvider } from './components/UI/CartContext.jsx';
import Header from './components/Header.jsx';
// import Footer from './components/Footer';

import './App.css';
import './components/UI/Cart.css';

export default function App() {
  // Hookah state that will be passed across pages
  const [currentHookah, setCurrentHookah] = useState({
    flavors: [],
    hookah: '',
    base: '',
    customizations: [],
  });

  return (
    <>
      <CartProvider>
        <Router>
          <div className="background"></div>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/drinks" element={<Drinks />} />
              {/* Pass currentHookah and setCurrentHookah as props to pages that require it */}
              <Route
                path="/menu/flavor"
                element={
                  <Flavor currentHookah={currentHookah} setCurrentHookah={setCurrentHookah} />
                }
              />
              <Route
                path="/menu/flavor/hookah"
                element={
                  <Hookah currentHookah={currentHookah} setCurrentHookah={setCurrentHookah} />
                }
              />
              <Route
                path="/menu/flavor/hookah/base"
                element={<Base currentHookah={currentHookah} setCurrentHookah={setCurrentHookah} />}
              />
              <Route
                path="/menu/flavor/hookah/base/customization"
                element={
                  <Customizations
                    currentHookah={currentHookah}
                    setCurrentHookah={setCurrentHookah}
                  />
                }
              />
            </Routes>
          </div>
          {/* <Footer /> */}
        </Router>
      </CartProvider>
    </>
  );
}
