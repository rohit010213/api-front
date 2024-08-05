import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './styles/CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://mern-api-5.onrender.com/api/cars', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setCars(response.data);

        // Check if the user is an admin
        const decodedToken = jwtDecode(token);
        if (decodedToken.role === 'admin') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error fetching cars:', error.response ? error.response.data : error.message);
      }
    };

    fetchCars();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-car/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://mern-api-5.onrender.com/api/cars/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCars(cars.filter(car => car._id !== id));
    } catch (error) {
      console.error('Error deleting car:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="car-list-container">
      <h1>Car List</h1>
      {isAdmin && <button className="add-car-button" onClick={() => navigate('/add-car')}>Add New Car</button>}
      <div className="car-cards">
        {cars.map(car => (
          <div key={car._id} className="car-card">
            <h2>{car.car_name}</h2>
            <p>Year: {car.manufacturing_year}</p>
            <p>Price: ${car.price}</p>
            {isAdmin && (
              <div className="card-buttons">
                <button className="edit-button" onClick={() => handleEdit(car._id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(car._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
