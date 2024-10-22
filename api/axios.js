import axios from 'axios';
import { getCookie } from 'cookies-next';

// Create an Axios instance
const axiosInstance = axios.create({
  //baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  baseURL:petcare-be-lilac.vercel.app,
  withCredentials: true, // Ensure all requests include credentials
});

// Add a request interceptor to include the JWT token in the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the JWT token from cookies
    const token = getCookie('jwt');
    if (token) {
      // Set the Authorization header with the JWT token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, just return the response
    return response;
  },
  (error) => {
    // If the response has an error
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      if (typeof window !== 'undefined') {
        window.location.href = '/Login';
      }
    }
    // Return the error to be handled by the calling function
    return Promise.reject(error);
  }
);

export default axiosInstance;
