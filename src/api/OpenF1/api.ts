import axios from 'axios';

const OpenF1API = axios.create({
  baseURL: 'https://api.openf1.org/v1',
  timeout: 5000, // Optional timeout
});

export default OpenF1API;