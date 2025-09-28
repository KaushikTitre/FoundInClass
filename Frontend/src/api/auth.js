// src/api/auth.js
import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

axios.defaults.withCredentials = true;


// Register
export const registerUser = async (name, email, password) => {
  return await axios.post(`${API_URL}/register`, { name, email, password });
};

export const login = async (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
}

// Logout
export const logout = async () => {
  return await axios.post(`${API_URL}/logout`, {});
};

export const client = async () =>{
  return await axios.get(`${API_URL}/client`);
}