import axios from "@/api/axios";
interface Notification {
  _id: string;
  user_id: string;
  category: string;
  Title: string;
  content: string;
  status: string;
}
export const sendNotifications = async (Notification: any) => {
  try {
    const response = await axios.post('/notification/add', Notification);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
}