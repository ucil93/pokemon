import axios from 'axios';
import baseURL from './../config';
    
const API = axios.create({
    baseURL: baseURL,
    headers: { 'Accept': 'application/json' },
});

export { API };