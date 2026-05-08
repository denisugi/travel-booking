import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const {
    title,
    slug,
    excerpt,
    featured_image,
    author,
    category,
    published_at,
    created_at,
  } = post;

  const date = published_at || created_at;
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="group overflow-hidden rounded-lg border bg-card">
      {/* Image */}
      <Link to={`/blog/${slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={featured_image || 'https://placehold.co/600x400'}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge variant="secondary" className="absolute left-3 top-3">
            {category}
          </Badge>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          {author && (
            <>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">
                    {author.name.charAt(0)}
                  </span>
                </div>
                <span>{author.name}</span>
              </div>
              <span className="text-muted-foreground/50">•</span>
            </>
          )}
          {formattedDate && <span>{formattedDate}</span>}
        </div>

        {/* Title & Excerpt */}
        <Link to={`/blog/${slug}`} className="block">
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>

        {/* Read More */}
        <Link
          to={`/blog/${slug}`}
          className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary hover:underline"
        >
          Read More
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

// Compact version for sidebar/lists
export const BlogCardCompact = ({ post }: BlogCardProps) => {
  const { title, slug, featured_image, category, created_at } = post;

  return (
    <Link
      to={`/blog/${slug}`}
      className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
    >
      <img
        src={featured_image || 'https://placehold.co/120x80'}
        alt={title}
        className="h-20 w-20 rounded-md object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <Badge variant="secondary" className="mb-2 text-xs">
          {category}
        </Badge>
        <h4 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(created_at).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};
