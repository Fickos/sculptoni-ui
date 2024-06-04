import axios from './';

export const login = async (username, password) => {
  return await axios.post('/users/login', { username, password });
};
