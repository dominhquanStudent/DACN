import axios from '@/api/axios';
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const login = async (email, password) => {
  try {
    const response = await axios.post(`/auth/login`, { email, password }, { withCredentials: true });
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
    const response = await axios.get(`/auth/refreshtoken`, { withCredentials: true });
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