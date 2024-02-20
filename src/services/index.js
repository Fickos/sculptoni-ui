import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT for every request
axiosInstance.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem('authToken');
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Redirect to login page in case user is not authorized for an action
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      console.log('Redirect to login page');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
