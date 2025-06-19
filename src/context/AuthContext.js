import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true
  });
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuthState({
        isAuthenticated: true,
        user: JSON.parse(localStorage.getItem('user')),
        token,
        loading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      
      // Decode token to get user info
      const user = decodeToken(token);
      localStorage.setItem('user', JSON.stringify(user));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuthState({
        isAuthenticated: true,
        user,
        token,
        loading: false
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password, role });
      const { token } = res.data;
      localStorage.setItem('token', token);
      
      const user = decodeToken(token);
      localStorage.setItem('user', JSON.stringify(user));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuthState({
        isAuthenticated: true,
        user,
        token,
        loading: false
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false
    });
    history.push('/login');
  };

  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
      );
      return JSON.parse(jsonPayload).user;
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };