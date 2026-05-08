<?php

namespace App\Console\Commands;

use App\Models\BlogPost;
use App\Models\TravelPackage;
use App\Services\SEOService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\URL;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate
                            {--format=xml : Output format (xml or json)}
                            {--pretty : Pretty print the output}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate XML sitemap for search engines';

    /**
     * Execute the console command.
     */
    public function handle(SEOService $seoService): int
    {
        $format = $this->option('format');
        $pretty = $this->option('pretty');

        $this->info('Generating sitemap...');

        // Get all published blog posts
        $blogPosts = BlogPost::published()
            ->select('slug', 'updated_at', 'published_at')
            ->orderBy('published_at', 'desc')
            ->get()
            ->map(function ($post) {
                return [
                    'url' => route('blog.show', $post->slug, false),
                    'lastmod' => $post->updated_at->toIso8601String(),
                    'priority' => '0.8',
                    'changefreq' => 'weekly',
                    'type' => 'blog',
                ];
            });

        // Get all active travel packages
        $packages = TravelPackage::active()
            ->select('slug', 'updated_at')
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function ($package) {
                return [
                    'url' => route('packages.show', $package->slug, false),
                    'lastmod' => $package->updated_at->toIso8601String(),
                    'priority' => '0.9',
                    'changefreq' => 'daily',
                    'type' => 'package',
                ];
            });

        // Static pages
        $staticPages = [
            [
                'url' => '/',
                'lastmod' => now()->toIso8601String(),
                'priority' => '1.0',
                'changefreq' => 'daily',
                'type' => 'static',
            ],
            [
                'url' => '/packages',
                'lastmod' => now()->toIso8601String(),
                'priority' => '0.9',
                'changefreq' => 'daily',
                'type' => 'static',
            ],
            [
                'url' => '/blog',
                'lastmod' => now()->toIso8601String(),
                'priority' => '0.8',
                'changefreq' => 'weekly',
                'type' => 'static',
            ],
            [
                'url' => '/contact',
                'lastmod' => now()->toIso8601String(),
                'priority' => '0.6',
                'changefreq' => 'monthly',
                'type' => 'static',
            ],
            [
                'url' => '/faq',
                'lastmod' => now()->toIso8601String(),
                'priority' => '0.5',
                'changefreq' => 'monthly',
                'type' => 'static',
            ],
        ];

        // Combine all items
        $allItems = collect($staticPages)
            ->merge($packages)
            ->merge($blogPosts);

        $baseUrl = config('app.url', 'http://localhost');

        if ($format === 'json') {
            return $this->generateJsonSitemap($allItems, $baseUrl, $pretty);
        }

        return $this->generateXmlSitemap($allItems, $baseUrl);
    }

    /**
     * Generate XML sitemap.
     */
    protected function generateXmlSitemap($items, string $baseUrl): int
    {
        $xml = new \SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap-0.9"></urlset>');

        foreach ($items as $item) {
            $urlElement = $xml->addChild('url');

            $loc = $item['url'];
            if (!str_starts_with($loc, 'http')) {
                $loc = rtrim($baseUrl, '/') . '/' . ltrim($loc, '/');
            }

            $urlElement->addChild('loc', htmlspecialchars($loc, ENT_XML1, 'UTF-8'));
            $urlElement->addChild('lastmod', $item['lastmod']);
            $urlElement->addChild('changefreq', $item['changefreq']);
            $urlElement->addChild('priority', $item['priority']);
        }

        $xmlContent = $xml->asXML();

        $publicPath = public_path('sitemap.xml');
        File::put($publicPath, $xmlContent);

        $this->info("XML sitemap generated at: {$publicPath}");
        $this->info("Total URLs: {$items->count()}");

        // Also save a gzipped version
        $gzPath = public_path('sitemap.xml.gz');
        file_put_contents($gzPath, gzencode($xmlContent, 9));

        $this->info("Gzipped sitemap generated at: {$gzPath}");

        return Command::SUCCESS;
    }

    /**
     * Generate JSON sitemap.
     */
    protected function generateJsonSitemap($items, string $baseUrl, bool $pretty): int
    {
        $data = $items->map(function ($item) use ($baseUrl) {
            $loc = $item['url'];
            if (!str_starts_with($loc, 'http')) {
                $loc = rtrim($baseUrl, '/') . '/' . ltrim($loc, '/');
            }

            return [
                'loc' => $loc,
                'lastmod' => $item['lastmod'],
                'changefreq' => $item['changefreq'],
                'priority' => (float) $item['priority'],
            ];
        })->values()->toArray();

        $jsonFlags = JSON_UNESCAPED_SLASHES;
        if ($pretty) {
            $jsonFlags |= JSON_PRETTY_PRINT;
        }

        $jsonContent = json_encode(['urlset' => ['@attributes' => ['xmlns' => 'http://www.sitemaps.org/schemas/sitemap-0.9']] + ['url' => $data]], $jsonFlags);

        $publicPath = public_path('sitemap.json');
        File::put($publicPath, $jsonContent);

        $this->info("JSON sitemap generated at: {$publicPath}");
        $this->info("Total URLs: " . count($data));

        return Command::SUCCESS;
    }
}
