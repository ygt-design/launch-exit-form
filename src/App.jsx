import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import SellerForm from './pages/SellerForm.jsx'
import BuyerForm from './pages/BuyerForm.jsx'
import Confirmation from './pages/Confirmation.jsx'
import { GlobalStyle } from './styles/GlobalStyle.js'

export default function App() {
  return (
    <>
      <GlobalStyle />
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
