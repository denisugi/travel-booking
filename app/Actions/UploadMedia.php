<?php

namespace App\Actions;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Models\TravelPackage;
use App\Models\BlogPost;
use Illuminate\Support\Str;

class UploadMedia
{
    public function uploadImage(UploadedFile $file, string $folder = 'images'): array
    {
        $filename = $this->generateFilename($file);
        $path = $file->storeAs($folder, $filename, 'public');

        return [
            'path' => $path,
            'url' => Storage::disk('public')->url($path),
            'filename' => $filename,
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
        ];
    }

    public function uploadMultipleImages(array $files, string $folder = 'images'): array
    {
        $results = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $results[] = $this->uploadImage($file, $folder);
            }
        }

        return $results;
    }

    public function uploadPackageGallery(TravelPackage $package, UploadedFile $file, bool $isPrimary = false): array
    {
        $uploaded = $this->uploadImage($file, 'package-galleries');

        $gallery = $package->galleries()->create([
            'image' => $uploaded['path'],
            'is_primary' => $isPrimary,
        ]);

        return [
            'gallery_id' => $gallery->id,
            ...$uploaded,
        ];
    }

    public function uploadBlogFeaturedImage(BlogPost $post, UploadedFile $file): array
    {
        if ($post->featured_image) {
            Storage::disk('public')->delete($post->featured_image);
        }

        $uploaded = $this->uploadImage($file, 'blog');

        $post->update(['featured_image' => $uploaded['path']]);

        return $uploaded;
    }

    public function uploadAvatar(UploadedFile $file): array
    {
        return $this->uploadImage($file, 'avatars');
    }

    public function deleteFile(?string $path): bool
    {
        if (!$path) {
            return false;
        }

        return Storage::disk('public')->delete($path);
    }

    public function deleteFileByUrl(string $url): bool
    {
        $path = str_replace(Storage::disk('public')->url(''), '', $url);
        return $this->deleteFile($path);
    }

    protected function generateFilename(UploadedFile $file): string
    {
        $extension = $file->getClientOriginalExtension();
        $baseName = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));
        return $baseName . '-' . time() . '.' . $extension;
    }

    public function getFileUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        return Storage::disk('public')->url($path);
    }
}
