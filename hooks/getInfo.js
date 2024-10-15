import axios from "@/api/axios";
import { getCookie } from "cookies-next";
const getInfo = async () => {
  const jwt = getCookie("jwt");
  try{
    const response = await axios.get("http://localhost:8080/auth/post", {
      headers: { Authorization: `Bearer ${jwt}` },
    });  
    return response.data;
  } catch (error) {
    console.log("Error getting account data:", error);
  }

}
export default getInfo;