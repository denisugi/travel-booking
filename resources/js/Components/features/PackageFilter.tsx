import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { PackageFilters } from '@/types';
import { cn } from '@/lib/utils';

interface PackageFilterProps {
  filters: PackageFilters;
  onFilterChange: (filters: PackageFilters) => void;
  categories?: string[];
  locations?: string[];
  className?: string;
}

export const PackageFilter = ({
  filters,
  onFilterChange,
  categories = [],
  locations = [],
  className,
}: PackageFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState<PackageFilters>(filters);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const newFilters = { ...localFilters, search };
    setLocalFilters(newFilters);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  const handleSelectChange = (key: keyof PackageFilters, value: string) => {
    const newFilters = { ...localFilters, [key]: value === 'all' ? undefined : value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const emptyFilters: PackageFilters = {};
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== undefined).length;

  const removeFilter = (key: keyof PackageFilters) => {
    const newFilters = { ...filters, [key]: undefined };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search packages..."
            className="pl-10"
            value={localFilters.search || ''}
            onChange={handleSearchChange}
          />
        </div>
        <Button type="submit">Search</Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </form>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.category && (
            <Badge variant="secondary" className="gap-1">
              {filters.category}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter('category')} />
            </Badge>
          )}
          {filters.location && (
            <Badge variant="secondary" className="gap-1">
              {filters.location}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter('location')} />
            </Badge>
          )}
          {filters.min_price && (
            <Badge variant="secondary" className="gap-1">
              Min: ${filters.min_price}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter('min_price')} />
            </Badge>
          )}
          {filters.max_price && (
            <Badge variant="secondary" className="gap-1">
              Max: ${filters.max_price}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter('max_price')} />
            </Badge>
          )}
          {filters.min_rating && (
            <Badge variant="secondary" className="gap-1">
              {filters.min_rating}+ stars
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter('min_rating')} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-muted-foreground">
            Clear all
          </Button>
        </div>
      )}

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid gap-4 p-4 border rounded-lg bg-card">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={localFilters.category || 'all'}
                onValueChange={(v) => handleSelectChange('category', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select
                value={localFilters.location || 'all'}
                onValueChange={(v) => handleSelectChange('location', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All locations</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Rating */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Min Rating</label>
              <Select
                value={localFilters.min_rating?.toString() || 'all'}
                onValueChange={(v) => handleSelectChange('min_rating', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any rating</SelectItem>
                  <SelectItem value="4">4+ stars</SelectItem>
                  <SelectItem value="3">3+ stars</SelectItem>
                  <SelectItem value="2">2+ stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select
                value={localFilters.sort_by || 'created_at'}
                onValueChange={(v) => handleSelectChange('sort_by', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at">Newest</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Min Price</label>
              <Input
                type="number"
                placeholder="0"
                min="0"
                value={localFilters.min_price || ''}
                onChange={(e) => {
                  const val = e.target.value ? parseInt(e.target.value) : undefined;
                  setLocalFilters({ ...localFilters, min_price: val });
                }}
                onBlur={() => onFilterChange(localFilters)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Price</label>
              <Input
                type="number"
                placeholder="Any"
                min="0"
                value={localFilters.max_price || ''}
                onChange={(e) => {
                  const val = e.target.value ? parseInt(e.target.value) : undefined;
                  setLocalFilters({ ...localFilters, max_price: val });
                }}
                onBlur={() => onFilterChange(localFilters)}
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                checked={localFilters.featured || false}
                onChange={(e) => {
                  const newFilters = { ...localFilters, featured: e.target.checked || undefined };
                  setLocalFilters(newFilters);
                }}
              />
              <span className="text-sm">Featured only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                checked={localFilters.available || false}
                onChange={(e) => {
                  const newFilters = { ...localFilters, available: e.target.checked || undefined };
                  setLocalFilters(newFilters);
                }}
              />
              <span className="text-sm">Available only</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
