import api from "./axios";

export const getSweets = () => api.get("/sweets");

export const createSweet = (data) => api.post("/sweets", data);

export const updateSweet = (id, data) =>
  api.put(`/sweets/${id}`, data);

export const deleteSweet = (id) =>
  api.delete(`/sweets/${id}`);

export const restockSweet = (id, quantity) =>
  api.post(`/sweets/${id}/restock`, { quantity });
export const purchaseSweet = (id) =>
  api.post(`/sweets/${id}/purchase`);
