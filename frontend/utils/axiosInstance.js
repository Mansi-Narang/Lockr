import axios from 'axios';

const axiosInstance = axios.create({
    baseURL : 'https://lockr-1ftl.onrender.com/',
    withCredentials: true
});

export default axiosInstance;