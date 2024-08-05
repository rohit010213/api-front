import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/CarForm.css';

const AddCar = () => {
  const [carName, setCarName] = useState('');
  const [manufacturingYear, setManufacturingYear] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'https://api-front-lv6m.onrender.com/api/cars',
        {
          car_name: carName,
          manufacturing_year: manufacturingYear,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Add Car Response:', response.data); // Log response for debugging
      navigate('/car-list'); // Navigate to car list or refresh list
    } catch (error) {
      setError('Failed to add car. Please try again.');
      console.error('Add car error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="car-form-container">
      <h1>Add New Car</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Car Name"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Manufacturing Year"
          value={manufacturingYear}
          onChange={(e) => setManufacturingYear(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Add Car</button>
        {error && <p className="car-error">{error}</p>}
      </form>
    </div>
  );
};

export default AddCar;
