import client from "./client";

export const listServices = () => client.get('/services');
export const createServices = (data) => client.post('/services', data);
export const updateServices = (id, data) => client.patch(`/services/${id}`, data);
export const deleteServices = (id) => client.delete(`/services/${id}`);

// Singular aliases
export const createService = createServices;
export const updateService = updateServices;
export const deleteService = deleteServices;
