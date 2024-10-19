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
          src={User.src}
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
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>

      {/* Bottom part */}
      <div className="mt-2">{props.content}</div>
    </div>
  );
}
