import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Components/Register.jsx';
import Login from './Components/Login.jsx';
import CarList from './Components/CarList.jsx';
import AddCar from './Components/AddCar.jsx';
import EditCar from './Components/EditCar.jsx';
import { useAuth } from './hooks/useAuth.js';
import "./style.css"

const App = () => {
  const { isAuthenticated, role } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/car-list"
        element={isAuthenticated && role === 'admin' ? <CarList /> : <Navigate to="/car-list-user" />}
      />
      <Route
        path="/add-car"
        element={isAuthenticated && role === 'admin' ? <AddCar /> : <Navigate to="/car-list-user" />}
      />
      <Route
        path="/edit-car/:id"
        element={isAuthenticated && role === 'admin' ? <EditCar /> : <Navigate to="/car-list-user" />}
      />
      <Route path="/car-list-user" element={<CarList />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
