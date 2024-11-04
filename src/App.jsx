import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Second from "./pages/second.jsx";
import Home from "./pages/home.jsx";
import AddClient from "./pages/AddClient.jsx";
import Inventories from "./pages/Inventories.jsx";
import PaidPage from "./pages/PaidPage.jsx";
import ContadorBilletes from "./pages/ContadorBilletes.jsx";
import Ventas from "./pages/Ventas.jsx";
import MenuVentas from "./pages/MenuVentas.jsx";
import Login from "./pages/Login.jsx";
import ConfigurationPage from "./pages/ConfigurationPage.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ProtectedRoute from "./components/ProtectedRoute"; // Importa el componente

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />{" "}
          {/* Redirige a /home */}
          <Route
            path="/second"
            element={
              <ProtectedRoute>
                <Second />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddClient"
            element={
              <ProtectedRoute>
                <AddClient />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Inventories"
            element={
              <ProtectedRoute>
                <Inventories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PaidPage"
            element={
              <ProtectedRoute>
                <PaidPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ContadorBilletes"
            element={
              <ProtectedRoute>
                <ContadorBilletes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Ventas"
            element={
              <ProtectedRoute>
                <Ventas />
              </ProtectedRoute>
            }
          />
           <Route
            path="/MenuVentas"
            element={
              <ProtectedRoute>
                <MenuVentas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Configuration"
            element={
              <ProtectedRoute>
                <ConfigurationPage />
              </ProtectedRoute>
            }
          />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </MainLayout>
    </DndProvider>
  );
}

export default App;
