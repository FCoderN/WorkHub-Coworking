import api from './api';

export const getSpaces  = (params) => api.get('/spaces', { params });
export const getSpaceById = (id)   => api.get(`/spaces/${id}`);
