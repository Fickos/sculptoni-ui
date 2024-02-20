import axios from './';

export const login = async (username, password) => {
  return await axios.get(`/users/login`, { params: { username, password } });
};
