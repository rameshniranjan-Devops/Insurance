import axios from 'axios';

// Use relative path '/api' if no environment variable is set
// This will send requests to http://your-ip:3000/api (same origin)
const API_URL = process.env.REACT_APP_API_URL || '/api';
const API = axios.create({ baseURL: API_URL });

export default API;