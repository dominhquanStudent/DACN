import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';

export const checkAuthAndRole = (req, res) => {
  const token = getCookie('jwt', { req, res });
  if (!token) {
    return { authenticated: false, role: null };
  }

  try {
    const decodedToken = jwt.decode(token);
    const role = decodedToken.role; // Assuming the role is stored in the token
    return { authenticated: true, role };
  } catch (error) {
    console.error("Error decoding token:", error);
    return { authenticated: false, role: null };
  }
};