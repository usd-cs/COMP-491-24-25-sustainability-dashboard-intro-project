// src/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Base URL for the backend API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;