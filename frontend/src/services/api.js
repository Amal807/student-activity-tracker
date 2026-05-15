import axios from 'axios';

// Centralized base URL for Axios
const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchActivities = async () => {
  const response = await api.get('/activities');
  return response.data;
};

export const fetchSummary = async () => {
  const response = await api.get('/summary');
  return response.data;
};

export const addActivity = async (activityData) => {
  const response = await api.post('/activities', activityData);
  return response.data;
};

export const deleteActivity = async (id) => {
  const response = await api.delete(`/activities/${id}`);
  return response.data;
};

export default api;
