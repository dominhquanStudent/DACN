import User from "../../../../public/img/Header/User.png";
export default function Comment() {
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
          <div className="font-bold">Do Min Kuan</div>
          <span>⭐⭐⭐⭐⭐</span>
          <div className="text-sm text-gray-500">25 tháng 3 năm 2024</div>
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
      <div className="mt-2">尊い貴方を心から愛してると</div>
    </div>
  );
}
