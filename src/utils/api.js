// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sheet.best/api/sheets/c2db6ed3-5cd2-4dd5-ba8d-66233e009ca8'
});

export default api;