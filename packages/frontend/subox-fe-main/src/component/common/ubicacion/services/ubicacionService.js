// src/services/ubicacionService.js
import axios from 'axios';

const API_BASE = `${process.env.REACT_APP_API_CLIENTES}api/ubicaciones`;

export const obtenerRegiones = () => {
  return axios.get(`${API_BASE}/regiones`).then(res => res.data);
};

export const obtenerProvinciasPorRegion = (regionId) => {
  return axios.get(`${API_BASE}/provincias?regionId=${regionId}`).then(res => res.data);
};

export const obtenerComunasPorProvincia = (provinciaId) => {
  return axios.get(`${API_BASE}/comunas?provinciaId=${provinciaId}`).then(res => res.data);
};
