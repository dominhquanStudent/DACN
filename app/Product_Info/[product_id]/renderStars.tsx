// renderStars.tsx
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function RenderStars(props: any) {
  const fullStars = Math.floor(props.rating);
  const hasHalfStar = (props.rating % 1) >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} color="yellow" size={20} />
      ))}
      {hasHalfStar && <FaStarHalfAlt key="half" color="yellow" size={20} />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} color="gray" size={20} />
      ))}
    </div>
  );
}