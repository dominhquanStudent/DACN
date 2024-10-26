import axios from '@/api/axios';
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const login = async (email, password) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await axios.post(`${baseURL}/auth/login`, { email, password }, { withCredentials: true });
    console.log('Response Headers:', response.headers);
    if (response.data.jwt) {
      deleteCookie("jwt");
      setCookie("jwt", response.data.jwt, { maxAge: 60 * 60 * 24 });
    }
    return response.data;
  } catch (error) {
    return error.response.data;
  }

};

const refreshToken = async () => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await axios.get(`${baseURL}/auth/refreshtoken`, { withCredentials: true });
    console.log('Refreshing');
    if (response.data.jwt) {
      deleteCookie("jwt");
      setCookie("jwt", response.data.jwt, { maxAge: 60 * 60 * 24 });
    }
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const isAuthenticated = () => {
  const token = getCookie("jwt");
  return !!token;
};
export default {
  login,
  refreshToken,
  isAuthenticated
};
