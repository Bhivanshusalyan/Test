import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export default function StarRating({ rating, maxRating = 5, size = 18, interactive = false, onChange }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= rating;
        const isHalf = !isFilled && starValue - 0.5 <= rating;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(starValue)}
            className={`${interactive ? 'cursor-pointer hover:scale-125 transition-transform duration-200' : 'cursor-default'} focus:outline-none`}
          >
            <Star
              size={size}
              className={`transition-colors duration-200 ${
                isFilled
                  ? 'fill-accent-400 text-accent-400'
                  : isHalf
                  ? 'fill-accent-400/50 text-accent-400'
                  : 'fill-transparent text-slate-600'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
