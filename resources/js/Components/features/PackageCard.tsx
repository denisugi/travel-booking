import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { StarRating } from './StarRating';
import { Package } from '@/types';

interface PackageCardProps {
  packageData: Package;
}

export const PackageCard = ({ packageData }: PackageCardProps) => {
  const {
    name,
    slug,
    short_description,
    price,
    discount_price,
    duration,
    location,
    category,
    images,
    rating,
    review_count,
    featured,
  } = packageData;

  const displayPrice = discount_price || price;
  const hasDiscount = discount_price && discount_price < price;
  const mainImage = images?.[0] || 'https://placehold.co/600x400';

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={mainImage}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {featured && (
          <Badge variant="default" className="absolute left-3 top-3">
            Featured
          </Badge>
        )}
        {hasDiscount && (
          <Badge variant="destructive" className="absolute right-3 top-3">
            {Math.round(((price - discount_price!) / price) * 100)}% OFF
          </Badge>
        )}
        <Badge variant="secondary" className="absolute bottom-3 right-3">
          {category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{location}</span>
          <span className="text-muted-foreground/50">•</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{duration}</span>
        </div>

        <Link to={`/packages/${slug}`} className="block">
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {short_description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <StarRating rating={rating} size="sm" />
            <span className="text-sm text-muted-foreground">
              ({review_count})
            </span>
          </div>
          <div className="text-right">
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through mr-2">
                ${price}
              </span>
            )}
            <span className="text-lg font-bold text-primary">
              ${displayPrice}
            </span>
            <span className="text-sm text-muted-foreground">/person</span>
          </div>
        </div>
      </div>
    </div>
  );
};
