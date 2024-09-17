import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({
  handleRatingChange,
}: {
  handleRatingChange: (rating: number) => void;
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRatingClick = (ratingValue: number) => {
    setRating(ratingValue);
    handleRatingChange(ratingValue);
  };

  return (
    <div className="flex space-x-1 border-b-[1px] pb-2">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRatingClick(ratingValue)}
              className="hidden"
            />
            <FaStar
              className="cursor-pointer"
              color={ratingValue <= (hover || rating) ? "yellow" : "gray"}
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
