<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'featured_image' => $this->featured_image,
            'author_id' => $this->author_id,
            'blog_category_id' => $this->blog_category_id,
            'is_published' => $this->is_published,
            'published_at' => $this->published_at,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'meta_keywords' => $this->meta_keywords,
            'view_count' => $this->view_count,
            'featured' => $this->featured,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'author' => new UserResource($this->whenLoaded('author')),
            'category' => new BlogCategoryResource($this->whenLoaded('category')),
            'tags' => BlogTagResource::collection($this->whenLoaded('tags')),
        ];
    }
}
