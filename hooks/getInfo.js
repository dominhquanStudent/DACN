import axios from "@/api/axios";
import { getCookie } from "cookies-next";
const getInfo = async () => {
  const jwt = getCookie("jwt");
  const response = await axios.get("http://localhost:8080/auth/post", {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return response.data;
      // { example
    //     _id: new ObjectId('66c8125ac9b4f1f742c1b0a5'),
    //     userName: null,
    //     email: 'son1@gmail.com',
    //     password: '$2b$10$ALdfp4W.JPp6QXsaCYAcd.wkN5HEI0b3Nk4ubuOZIH.Y3OG8zJcye',
    //     phone: null,
    //     address: null,
    //     gender: null,
    //     birthday: null,
    //     token: [],
    //     avatar: null,
    //     role: 'user',
    //     deleted: false,
    //     deletedAt: null,
    //     __v: 0
    //   }
}
export default getInfo;