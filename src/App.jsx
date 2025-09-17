import React, { useEffect, useLayoutEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import SellerForm from './pages/SellerForm.jsx'
import BuyerForm from './pages/BuyerForm.jsx'
import Confirmation from './pages/Confirmation.jsx'
import { GlobalStyle } from './styles/GlobalStyle.js'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const location = useLocation();

  // Scroll to top on every navigation for HashRouter
  useLayoutEffect(() => {
    // Force scroll to top before browser paints
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  useEffect(() => {
    // Additional scroll after component mounts
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Try again after a short delay
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sell" element={<SellerForm />} />
        <Route path="/buy" element={<BuyerForm />} />
        <Route path="/thanks" element={<Confirmation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}
