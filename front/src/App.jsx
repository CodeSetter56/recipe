import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

import Home from './pages/Home';
import Create from './pages/Create';
import Saved from './pages/Saved';
import Auth from './pages/Auth';
import Edit from './pages/Edit';
import Your from './pages/Your';
import Navbar from './components/Navbar';

function App() {
  const [cookies, setCookie] = useCookies(["access_token"]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Set a flag in sessionStorage indicating a reload
      sessionStorage.setItem('isReloading', 'true');
    };

    const handleUnload = () => {
      const isReloading = sessionStorage.getItem('isReloading');
      
      // Only clear the userId if the page is NOT reloading
      if (!isReloading) {
        window.localStorage.removeItem("userId");
        setCookie("access_token", "");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [setCookie]);

  useEffect(() => {
    // Clear the reload flag after the page has fully loaded
    sessionStorage.removeItem('isReloading');
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/your' element={<Your />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;