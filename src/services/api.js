import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fe0c-82-215-106-106.ngrok-free.app/', // Asosiy API manzili
  // withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
