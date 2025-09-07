import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import SellerForm from './pages/SellerForm.jsx'
import BuyerForm from './pages/BuyerForm.jsx'
import Confirmation from './pages/Confirmation.jsx'
import { GlobalStyle } from './styles/GlobalStyle.js'
import Navbar from './components/Navbar.jsx'

export default function App() {
  const location = useLocation();

  useEffect(() => {
    try { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); } catch { window.scrollTo(0, 0); }
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
    </>
  )
}
