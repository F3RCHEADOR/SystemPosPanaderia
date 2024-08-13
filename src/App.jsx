import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Second from './pages/second.jsx';
import Home from './pages/home.jsx';
import AddClient from './pages/AddClient.jsx';

function App() {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />  {/* Redirige a /home */}
          <Route path="/second" element={<Second />} />
          <Route path="/home" element={<Home />} />
          <Route path="/AddClient" element={<AddClient />} />
        </Routes>
      </MainLayout>

    </>
  );
}

export default App;
