import axios from 'axios';
// const BASE_URL = 'http://localhost:5080/api';
const BASE_URL = 'https://betamarketingng.com/api';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});