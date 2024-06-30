import axios from './';

export const saveProject = async (project) => {
  return await axios.post('/projects/', project);
};

export const loadProjectById = async (projectId) => {
  return await axios.get(`/projects/${projectId}`);
};

export const listProjects = async () => {
  return await axios.get('/projects');
};
