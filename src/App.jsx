import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Second from './pages/second.jsx';
import Home from './pages/home.jsx';
import AddClient from './pages/AddClient.jsx';
import Inventories from './pages/Inventories.jsx';
import PaidPage from './pages/PaidPage.jsx';
import ContadorBilletes from './pages/ContadorBilletes.jsx';
import Ventas from './pages/Ventas.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />  {/* Redirige a /home */}
          <Route path="/second" element={<Second />} />
          <Route path="/home" element={<Home />} />
          <Route path="/AddClient" element={<AddClient />} />
          <Route path="/Inventories" element={<Inventories />} />
          <Route path="/PaidPage" element={<PaidPage />} />
          <Route path="/ContadorBilletes" element={<ContadorBilletes />} />
          <Route path="/Ventas" element={<Ventas />} />
        </Routes>
      </MainLayout>
    </DndProvider>
  );
}

export default App;
