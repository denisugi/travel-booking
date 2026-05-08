<?php

namespace App\Jobs;

use App\Models\BlogPost;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateBlogViewCountJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public BlogPost $post
    ) {
    }

    public function handle(): void
    {
        $this->post->incrementViewCount();
    }

    public function failed(\Throwable $exception): void
    {
        \Log::error('Failed to update blog view count', [
            'post_id' => $this->post->id,
            'exception' => $exception->getMessage(),
        ]);
    }
}
