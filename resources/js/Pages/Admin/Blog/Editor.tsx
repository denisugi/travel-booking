import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Eye,
  Image as ImageIcon,
  X,
  Plus,
  Check,
  AlertCircle,
  Calendar,
  Tag
} from 'lucide-react';

interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  featured_image: string;
  status: 'published' | 'draft' | 'scheduled';
  is_featured: boolean;
  scheduled_at: string;
  meta_title: string;
  meta_description: string;
}

const mockPost: BlogPost = {
  id: 1,
  title: '10 Best Places to Visit in Bali',
  slug: '10-best-places-to-visit-in-bali',
  excerpt: 'Discover the most breathtaking destinations in Bali, from ancient temples to pristine beaches.',
  content: `<h2>Introduction</h2>
<p>Bali is one of the most popular tourist destinations in the world, and for good reason. This Indonesian island offers something for everyone, from stunning beaches to ancient temples, lush rice terraces to vibrant nightlife.</p>

<h2>1. Ubud</h2>
<p>Ubud is the cultural heart of Bali, known for its art galleries, yoga retreats, and the famous Sacred Monkey Forest. The town is surrounded by terraced rice paddies and ancient temples.</p>

<h2>2. Tanah Lot Temple</h2>
<p>This iconic sea temple sits on a rocky outcrop just offshore. It's one of the most photographed temples in Bali and offers spectacular sunset views.</p>

<h2>3. Seminyak</h2>
<p>For those seeking beach clubs, upscale restaurants, and boutique shopping, Seminyak is the place to be. The beach is perfect for surfing and sunbathing.</p>`,
  category: 'Travel Guide',
  tags: 'Bali, Indonesia, Travel, Destinations',
  featured_image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
  status: 'published',
  is_featured: true,
  scheduled_at: '',
  meta_title: '10 Best Places to Visit in Bali - Travel Guide 2024',
  meta_description: 'Discover the most breathtaking destinations in Bali, from ancient temples to pristine beaches. Complete travel guide with insider tips.',
};

const categoryOptions = [
  'Travel Guide',
  'Travel Tips',
  'Budget Travel',
  'Destinations',
  'Romantic Travel',
  'Adventure',
  'Food & Cuisine',
  'Culture',
];

export default function BlogEditor() {
  const { id } = useParams();
  const isEditing = !!id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPreview, setShowPreview] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const [formData, setFormData] = useState<BlogPost>(isEditing ? mockPost : {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featured_image: '',
    status: 'draft',
    is_featured: false,
    scheduled_at: '',
    meta_title: '',
    meta_description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (name === 'title' && !isEditing) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }

    setErrors({ ...errors, [name]: '' });
  };

  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, featured_image: imageUrl });
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.split(',').map(t => t.trim()).includes(tagInput.trim())) {
      setFormData({ 
        ...formData, 
        tags: formData.tags ? `${formData.tags}, ${tagInput.trim()}` : tagInput.trim() 
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.split(',').filter(t => t.trim() !== tagToRemove).join(', ')
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.category) newErrors.category = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.history.back();
    } catch (error) {
      setErrors({ submit: 'Failed to save post. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setFormData({ ...formData, status: 'draft' });
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link to="/admin/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Blog Post' : 'Create Blog Post'}
            </h1>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? 'Hide Preview' : 'Preview'}
            </button>
          </div>
        </div>

        {showPreview ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="max-w-3xl mx-auto">
              {formData.featured_image && (
                <img src={formData.featured_image} alt={formData.title} className="w-full h-64 object-cover rounded-lg mb-6" />
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{formData.title || 'Untitled Post'}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">{formData.category || 'Uncategorized'}</span>
                <span>{formData.status}</span>
              </div>
              <p className="text-lg text-gray-600 mb-6">{formData.excerpt || 'No excerpt provided'}</p>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: formData.content || '<p>No content yet...</p>' }} />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Content</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                      <input type="text" name="title" value={formData.title} onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-lg outline-none ${errors.title ? 'border-red-300' : 'border-gray-200'}`}
                        placeholder="Enter post title" />
                      {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                      <input type="text" name="slug" value={formData.slug} onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-lg outline-none ${errors.slug ? 'border-red-300' : 'border-gray-200'}`}
                        placeholder="post-url-slug" />
                      {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label>
                      <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3}
                        className={`w-full px-4 py-2.5 border rounded-lg outline-none resize-none ${errors.excerpt ? 'border-red-300' : 'border-gray-200'}`}
                        placeholder="Brief summary of the post" />
                      {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                      <textarea name="content" value={formData.content} onChange={handleChange} rows={15}
                        className={`w-full px-4 py-2.5 border rounded-lg outline-none resize-none font-mono text-sm ${errors.content ? 'border-red-300' : 'border-gray-200'}`}
                        placeholder="Write your content here (HTML supported)" />
                      {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                    </div>
                  </div>
                </div>

                {/* SEO */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                      <input type="text" name="meta_title" value={formData.meta_title} onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none"
                        placeholder="SEO title for search engines" />
                      <p className="text-xs text-gray-500 mt-1">{formData.meta_title.length}/60 characters</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                      <textarea name="meta_description" value={formData.meta_description} onChange={handleChange} rows={2}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none resize-none"
                        placeholder="Brief description for search engine results" />
                      <p className="text-xs text-gray-500 mt-1">{formData.meta_description.length}/160 characters</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Publish */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Publish</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select name="status" value={formData.status} onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="scheduled">Scheduled</option>
                      </select>
                    </div>
                    {formData.status === 'scheduled' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
                        <input type="datetime-local" name="scheduled_at" value={formData.scheduled_at} onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none" />
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300" />
                      <span className="text-sm font-medium text-gray-700">Featured Post</span>
                    </div>
                  </div>
                </div>

                {/* Category & Tags */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Category & Tags</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <select name="category" value={formData.category} onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-lg outline-none bg-white ${errors.category ? 'border-red-300' : 'border-gray-200'}`}>
                        <option value="">Select category</option>
                        {categoryOptions.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                      <div className="flex gap-2">
                        <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg outline-none"
                          placeholder="Add tag" />
                        <button type="button" onClick={addTag}
                          className="px-3 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {formData.tags && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.tags.split(',').map((tag, index) => (
                            <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                              <Tag className="w-3 h-3" />
                              {tag.trim()}
                              <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-600">
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h2>
                  {formData.featured_image ? (
                    <div className="relative">
                      <img src={formData.featured_image} alt="Featured" className="w-full h-40 object-cover rounded-lg" />
                      <button type="button" onClick={() => setFormData({ ...formData, featured_image: '' })}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Click to upload featured image</p>
                    </label>
                  )}
                </div>
              </div>
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700">{errors.submit}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={handleSaveDraft}
                className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                Save as Draft
              </button>
              <button type="submit" disabled={isSubmitting}
                className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Publishing...</>
                ) : (
                  <><Check className="w-5 h-5" /> {isEditing ? 'Update Post' : 'Publish Post'}</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
