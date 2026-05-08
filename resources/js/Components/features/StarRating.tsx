import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
  onChange?: (rating: number) => void;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export const StarRating = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  className,
  onChange,
}: StarRatingProps) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < maxRating; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              'fill-yellow-400 text-yellow-400',
              onChange && 'cursor-pointer hover:scale-110 transition-transform'
            )}
            onClick={() => onChange?.(i + 1)}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(
          <StarHalf
            key={i}
            className={cn(
              sizeClasses[size],
              'fill-yellow-400 text-yellow-400',
              onChange && 'cursor-pointer hover:scale-110 transition-transform'
            )}
            onClick={() => onChange?.(i + 0.5)}
          />
        );
      } else {
        // Empty star
        stars.push(
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              'text-gray-300 dark:text-gray-600',
              onChange && 'cursor-pointer hover:scale-110 transition-transform'
            )}
            onClick={() => onChange?.(i + 1)}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">{renderStars()}</div>
      {showValue && (
        <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};
