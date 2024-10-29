import axios from "@/api/axios";
interface Notification {
  user_id: string;
  category: string;
  Title: string;
  content: string;
  status: string;
}
export function createNotification(notification: Notification): void {
  const { user_id,   category ,Title, content, status } = notification;
  // Example: Display the notification in the UI
  const notificationElement = document.createElement('div');
  notificationElement.innerHTML = `
    <div class="notification">
      <h2>${Title}</h2>
      <div>${content}</div>
    </div>
  `;
  document.body.appendChild(notificationElement);
}
export function saveNotification(notification: Notification): void {
  // Save the notification to the database
  try {
    const response = axios.post('/notification/add', notification);
  } catch (error) {
    console.error('Error saving notification:', error);
  }
}