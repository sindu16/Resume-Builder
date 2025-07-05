import axios from 'axios';

export const signupAPI = async (formData) => {
  const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
