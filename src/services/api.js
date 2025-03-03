import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api.com/api/v1', // Asosiy API manzili
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
