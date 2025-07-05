import axios from 'axios';

// GET Resume by ID
export const getResumeAPI = (id, token) => {
  
  return axios.get(`http://localhost:5000/api/resumes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// UPDATE Resume

export const updateResumeAPI = async (id, data, token) => {
 
  const response = await axios.put(
    `http://localhost:5000/api/resumes/${id}`,
    data, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
