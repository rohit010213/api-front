import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/EditCar.css';

const EditCar = () => {
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`https://api-front-lv6m.onrender.com/api/cars/${id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setCar(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching car details.');
                console.error('Error fetching car:', error);
                setLoading(false);
            }
        };

        fetchCar();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`https://api-front-cnqe.onrender.com/api/cars/${id}`, {
                car_name: car.car_name,
                manufacturing_year: car.manufacturing_year,
                price: car.price
            }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            console.log('Update Car Response:', response.data); // Log response for debugging
            navigate('/car-list');
        } catch (error) {
            setError('Error updating car.');
            console.error('Error updating car:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!car) return <div>No car found</div>;

    return (
        <div className="car-form-container">
            <h1>Edit Car</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={car.car_name} onChange={(e) => setCar({ ...car, car_name: e.target.value })} required />
                <input type="number" value={car.manufacturing_year} onChange={(e) => setCar({ ...car, manufacturing_year: e.target.value })} required />
                <input type="number" value={car.price} onChange={(e) => setCar({ ...car, price: e.target.value })} required />
                <button type="submit">Update Car</button>
            </form>
        </div>
    );
};

export default EditCar;
