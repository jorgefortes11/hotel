import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

axios.defaults.baseURL = API_URL;

export const getRooms = async () => {
  try {
    const response = await axios.get('/rooms');
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

export const getAvailableRooms = async (checkIn, checkOut) => {
  try {
    const response = await axios.get('/rooms/available', {
      params: { checkIn, checkOut }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const getUserBookings = async (userId) => {
  try {
    const response = await axios.get(`/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
};