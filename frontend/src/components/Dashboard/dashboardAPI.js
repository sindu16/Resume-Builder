import axios from 'axios';

export const fetchResumesAPI = async (token) => {
  const response = await axios.get('http://localhost:5000/api/resumes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


