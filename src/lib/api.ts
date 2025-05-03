import axios from 'axios';

const API_URL = 'http://localhost:8000';  // Hardcoded for now to ensure it works

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const signup = async (userData: any) => {
  return axios.post(`${API_URL}/signup`, userData, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });
};

export const login = async (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, { email, password }, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });
};