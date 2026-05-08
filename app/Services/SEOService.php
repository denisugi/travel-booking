<?php

namespace App\Services;

use App\Models\BlogPost;
use App\Models\TravelPackage;
use Illuminate\Support\Facades\DB;

class SEOService
{
    public function generateMetaTags(string $type, int $id): array
    {
        return match ($type) {
            'blog' => $this->getBlogMetaTags($id),
            'package' => $this->getPackageMetaTags($id),
            'home' => $this->getHomeMetaTags(),
            default => [],
        };
    }

    protected function getBlogMetaTags(int $id): array
    {
        $post = BlogPost::find($id);

        if (!$post) {
            return [];
        }

        return [
            'title' => $post->meta_title ?: $post->title,
            'description' => $post->meta_description ?: $post->excerpt,
            'keywords' => $post->meta_keywords,
            'image' => $post->featured_image,
            'url' => route('blog.show', $post->slug),
            'type' => 'article',
            'published_at' => $post->published_at?->toIso8601String(),
            'author' => $post->author?->name,
        ];
    }

    protected function getPackageMetaTags(int $id): array
    {
        $package = TravelPackage::find($id);

        if (!$package) {
            return [];
        }

        return [
            'title' => $package->meta_title ?: $package->name . ' - Travel Package',
            'description' => $package->meta_description ?: $package->short_description ?: $package->description,
            'keywords' => $package->meta_keywords ?? implode(', ', [$package->destination, $package->name]),
            'image' => $package->galleries->first()?->image,
            'url' => route('packages.show', $package->slug),
            'type' => 'product',
            'price' => $package->discount_price ?? $package->price,
            'currency' => 'USD',
        ];
    }

    protected function getHomeMetaTags(): array
    {
        return [
            'title' => config('app.name', 'Travel Booking'),
            'description' => 'Book your dream travel packages online. Explore destinations, compare prices, and book with confidence.',
            'keywords' => 'travel, booking, vacation, packages, tours',
            'type' => 'website',
        ];
    }

    public function generateSitemap(): array
    {
        $blogPosts = BlogPost::published()
            ->select('slug', 'updated_at')
            ->get()
            ->map(fn ($post) => [
                'url' => route('blog.show', $post->slug),
                'lastmod' => $post->updated_at->toIso8601String(),
                'priority' => '0.8',
                'changefreq' => 'weekly',
            ]);

        $packages = TravelPackage::active()
            ->select('slug', 'updated_at')
            ->get()
            ->map(fn ($package) => [
                'url' => route('packages.show', $package->slug),
                'lastmod' => $package->updated_at->toIso8601String(),
                'priority' => '0.9',
                'changefreq' => 'daily',
            ]);

        return [
            'blog' => $blogPosts->toArray(),
            'packages' => $packages->toArray(),
        ];
    }

    public function generateRobotsTxt(): string
    {
        $rules = config('seo.robots_txt_rules', []);

        $output = "User-agent: *\n";

        foreach ($rules as $rule) {
            $output .= "Disallow: {$rule}\n";
        }

        $output .= "\nSitemap: " . route('sitemap.xml') . "\n";

        return $output;
    }

    public function getSeoScore(string $type, int $id): array
    {
        $tags = $this->generateMetaTags($type, $id);

        $score = 0;
        $issues = [];

        if (!empty($tags['title'])) {
            $score += 25;
        } else {
            $issues[] = 'Missing title tag';
        }

        if (!empty($tags['description'])) {
            $score += 25;
        } else {
            $issues[] = 'Missing meta description';
        }

        if (!empty($tags['image'])) {
            $score += 25;
        } else {
            $issues[] = 'Missing og:image';
        }

        if (!empty($tags['keywords'])) {
            $score += 25;
        } else {
            $issues[] = 'Missing meta keywords';
        }

        return [
            'score' => $score,
            'max_score' => 100,
            'issues' => $issues,
            'passed' => $score >= 75,
        ];
    }

    public function generateStructuredData(string $type, int $id): ?array
    {
        return match ($type) {
            'blog' => $this->getBlogStructuredData($id),
            'package' => $this->getPackageStructuredData($id),
            default => null,
        };
    }

    protected function getBlogStructuredData(int $id): ?array
    {
        $post = BlogPost::find($id);

        if (!$post) {
            return null;
        }

        return [
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'headline' => $post->title,
            'description' => $post->excerpt,
            'image' => $post->featured_image,
            'author' => [
                '@type' => 'Person',
                'name' => $post->author?->name,
            ],
            'publisher' => config('app.name'),
            'datePublished' => $post->published_at?->toIso8601String(),
            'dateModified' => $post->updated_at->toIso8601String(),
        ];
    }

    protected function getPackageStructuredData(int $id): ?array
    {
        $package = TravelPackage::find($id);

        if (!$package) {
            return null;
        }

        return [
            '@context' => 'https://schema.org',
            '@type' => 'TouristTrip',
            'name' => $package->name,
            'description' => $package->description,
            'image' => $package->galleries->first()?->image,
            'touristType' => $package->destination,
            'duration' => 'P' . $package->duration_days . 'D',
            'offers' => [
                '@type' => 'Offer',
                'price' => $package->discount_price ?? $package->price,
                'priceCurrency' => 'USD',
            ],
        ];
    }
}
