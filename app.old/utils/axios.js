import axios from 'axios';

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh');

    if (!refreshToken) {
      throw new Error('No refresh token found');
    }
  
    try {
      const response = await API.post('token/refresh/', {
        refresh: refreshToken,
      });
      const newAccessToken = response.data.access;

      localStorage.setItem('access', newAccessToken); 
      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
};

const API = axios.create({
    baseURL: 'http://localhost:8080/api/auth',
});

export default API;
