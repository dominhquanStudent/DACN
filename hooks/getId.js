import axios from "@/api/axios";
import { getCookie } from "cookies-next";
import { useAuth } from '@/context/authProvider';
const getId = async () => {
  const {Auth, setAuth} = useAuth();
  return Auth.id;

}
export default getId;