import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct named import


export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded) {
          setIsAuthenticated(true);
          setRole(decoded.role);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setRole(null);
      }
    }
  }, []);

  return { isAuthenticated, role };
};
