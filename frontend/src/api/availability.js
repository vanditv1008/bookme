import client from './client';

export const getAvailability = () => client.get(`/availability`);
export const listAvailability = getAvailability;
export const saveAvailability = (data) => client.put(`/availability`, data);
