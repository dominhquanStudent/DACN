import User from "@/public/img/Header/User.png";
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric', // Add year to the options
  };
  return new Intl.DateTimeFormat('vi-VN', options).format(date);
}
export default function Comment(props: any) {
  
  return (
    <div className="mt-4 m-9">
      {/* Top part */}
      <div className="flex items-center space-x-2">
        <img
          src={props.avatar||props.accountData.avatar.url}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
        <div className="flex space-x-4 items-center">
          <div className="font-bold">{props.user_name}</div>
          <span>
            {Array.from({ length: props.rating }, (_, i) => (
              <span key={i}>⭐</span>
            ))}
          </span>
          <div className="text-sm text-gray-500">{formatDate(props.createdAt)}</div>
        </div>
      
      </div>

      {/* Bottom part */}
      <div className="mt-2">{props.content}</div>
    </div>
  );
}
