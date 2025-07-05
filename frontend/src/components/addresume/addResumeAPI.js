
const BASE_URL = 'http://localhost:5000/api'; 

export const addResume = async ({ token, title }) => {
  console.log('Making API call to create resume...', { title });
  const response = await fetch(`${BASE_URL}/resumes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
