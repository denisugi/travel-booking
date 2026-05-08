<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Http\Resources\BlogPostResource;
use App\Http\Resources\BlogPostCollection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    /**
     * Display a listing of blog posts.
     */
    public function index(Request $request): JsonResponse
    {
        $query = BlogPost::with(['author', 'category', 'tags']);

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($request->has('category_id')) {
            $query->where('blog_category_id', $request->category_id);
        }

        if ($request->has('author_id')) {
            $query->where('author_id', $request->author_id);
        }

        if ($request->has('tag_id')) {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('blog_tags.id', $request->tag_id);
            });
        }

        if ($request->boolean('featured')) {
            $query->featured();
        }

        if ($request->boolean('published', true)) {
            $query->published();
        }

        if ($request->has('sort_by') && $request->has('sort_order')) {
            $sortBy = $request->sort_by;
            $sortOrder = $request->sort_order === 'asc' ? 'asc' : 'desc';
            $query->orderBy($sortBy, $sortOrder);
        } else {
            $query->orderBy('published_at', 'desc');
        }

        $posts = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => new BlogPostCollection($posts),
        ]);
    }

    /**
     * Store a newly created blog post.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blog_posts',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'featured_image' => 'nullable|string|max:500',
            'blog_category_id' => 'required|exists:blog_categories,id',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
            'featured' => 'boolean',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:blog_tags,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $post = BlogPost::create([
            'title' => $request->title,
            'slug' => $request->slug,
            'excerpt' => $request->excerpt,
            'content' => $request->content,
            'featured_image' => $request->featured_image,
            'author_id' => $request->user()->id,
            'blog_category_id' => $request->blog_category_id,
            'is_published' => $request->boolean('is_published', false),
            'published_at' => $request->is_published ? ($request->published_at ?? now()) : null,
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'meta_keywords' => $request->meta_keywords,
            'featured' => $request->boolean('featured', false),
        ]);

        if ($request->has('tags')) {
            $post->tags()->attach($request->tags);
        }

        return response()->json([
            'success' => true,
            'message' => 'Blog post created successfully',
            'data' => new BlogPostResource($post->load(['author', 'category', 'tags'])),
        ], 201);
    }

    /**
     * Display the specified blog post.
     */
    public function show(int $id): JsonResponse
    {
        $post = BlogPost::with(['author', 'category', 'tags'])->find($id);

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Blog post not found',
            ], 404);
        }

        // Increment view count
        $post->incrementViewCount();

        return response()->json([
            'success' => true,
            'data' => new BlogPostResource($post),
        ]);
    }

    /**
     * Update the specified blog post.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $post = BlogPost::find($id);

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Blog post not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:blog_posts,slug,' . $id,
            'excerpt' => 'nullable|string',
            'content' => 'sometimes|required|string',
            'featured_image' => 'nullable|string|max:500',
            'blog_category_id' => 'sometimes|required|exists:blog_categories,id',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
            'featured' => 'boolean',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:blog_tags,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $post->update($request->only([
            'title', 'slug', 'excerpt', 'content', 'featured_image',
            'blog_category_id', 'is_published', 'published_at',
            'meta_title', 'meta_description', 'meta_keywords', 'featured'
        ]));

        if ($request->has('tags')) {
            $post->tags()->sync($request->tags);
        }

        return response()->json([
            'success' => true,
            'message' => 'Blog post updated successfully',
            'data' => new BlogPostResource($post->load(['author', 'category', 'tags'])),
        ]);
    }

    /**
     * Remove the specified blog post.
     */
    public function destroy(int $id): JsonResponse
    {
        $post = BlogPost::find($id);

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Blog post not found',
            ], 404);
        }

        $post->delete();

        return response()->json([
            'success' => true,
            'message' => 'Blog post deleted successfully',
        ]);
    }

    /**
     * Get featured blog posts.
     */
    public function featured(): JsonResponse
    {
        $posts = BlogPost::featured()->published()->with(['author', 'category', 'tags'])->limit(5)->get();

        return response()->json([
            'success' => true,
            'data' => BlogPostResource::collection($posts),
        ]);
    }

    /**
     * Get blog posts by slug.
     */
    public function bySlug(string $slug): JsonResponse
    {
        $post = BlogPost::where('slug', $slug)->with(['author', 'category', 'tags'])->first();

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Blog post not found',
            ], 404);
        }

        $post->incrementViewCount();

        return response()->json([
            'success' => true,
            'data' => new BlogPostResource($post),
        ]);
    }
}
