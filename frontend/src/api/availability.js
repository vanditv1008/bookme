import client from './client';

export const getAvailability = () => client.get(`/availability`);
export const saveAvailability = (slug, data) => client.put(`/availability`, data);