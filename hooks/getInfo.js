import axios from "@/api/axios";
import { getCookie } from "cookies-next";
const getInfo = async () => {
  const jwt = getCookie("jwt");
  try{
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await axios.get(`${baseURL}/auth/post`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });  
    return response.data;
  } catch (error) {
    console.log("Error getting account data:", error);
  }

}
export default getInfo;
