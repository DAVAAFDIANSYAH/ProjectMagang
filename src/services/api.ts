import axios from 'axios';

const api = axios.create({
  baseURL: 'https://leading-diverse-gator.ngrok-free.app/api/', 
  timeout: 5000,
});

export default api;
