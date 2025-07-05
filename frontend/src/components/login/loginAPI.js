import axios from 'axios'

export const loginAPI = async (credentials) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    return response;
  } catch (error) {
    throw error; 
  }
};