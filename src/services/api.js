import { incidents } from "./mockData";
import { services } from "./mockData";

let data = [...incidents];

export const fetchIncidents = async () => {
  await new Promise(r => setTimeout(r, 800));
  return data;
};

export const updateNotes = async (id, notes) => {
  await new Promise(r => setTimeout(r, 500));
  data = data.map(i => (i.id === id ? { ...i, notes } : i));
};

export const fetchServices = async () => {
  await new Promise(r => setTimeout(r, 800));
  return services;
};

export const updateIncidentStatus = (id, status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, status });
    }, 500);
  });
};