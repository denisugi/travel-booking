import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Plus, 
  Check,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';

export default function PackageCreate() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [images, setImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    short_description: '',
    description: '',
    destination: '',
    duration_days: '',
    duration_nights: '',
    price: '',
    discount_price: '',
    max_participants: '',
    departure_date: '',
    return_date: '',
    featured: false,
    is_active: true,
    includes: '',
    excludes: '',
    itinerary: '',
    highlights: '',
    terms_conditions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (name === 'name' && !formData.slug) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }

    setErrors({ ...errors, [name]: '' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index]);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
    if (!formData.short_description.trim()) newErrors.short_description = 'Short description is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (!formData.duration_days) newErrors.duration_days = 'Duration is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.max_participants) newErrors.max_participants = 'Max participants is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate('/admin/packages');
    } catch (error) {
      setErrors({ submit: 'Failed to create package. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link to="/admin/packages" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Packages
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create Travel Package</h1>
          <p className="text-gray-600 mt-1">Add a new travel package to your catalog</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">General Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Package Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg outline-none ${errors.name ? 'border-red-300' : 'border-gray-200'}`}
                  placeholder="e.g., Bali Paradise Trip" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg outline-none ${errors.slug ? 'border-red-300' : 'border-gray-200'}`}
                  placeholder="e.g., bali-paradise-trip" />
                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
                <input type="text" name="short_description" value={formData.short_description} onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg outline-none ${errors.short_description ? 'border-red-300' : 'border-gray-200'}`}
                  placeholder="Brief summary for listing pages" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={5}
                  className={`w-full px-4 py-2.5 border rounded-lg outline-none resize-none ${errors.description ? 'border-red-300' : 'border-gray-200'}`}
                  placeholder="Detailed description" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination *</label>
                  <input type="text" name="destination" value={formData.destination} onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg outline-none ${errors.destination ? 'border-red-300' : 'border-gray-200'}`}
                    placeholder="e.g., Bali, Indonesia" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants *</label>
                  <input type="number" name="max_participants" value={formData.max_participants} onChange={handleChange} min="1"
                    className={`w-full px-4 py-2.5 border rounded-lg outline-none ${errors.max_participants ? 'border-red-300' : 'border-gray-200'}`}
                    placeholder="e.g., 20" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Duration & Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days) *</label>
                <input type="number" name="duration_days" value={formData.duration_days} onChange={handleChange} min="1"
                  className={`w-full px-4 py-2.5 border rounded-lg outline-none ${errors.duration_days ? 'border-red-300' : 'border-gray-200'}`}
                  placeholder="e.g., 8" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Nights)</label>
                <input type="number" name="duration_nights" value={formData.duration_nights} onChange={handleChange} min="0"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none" placeholder="e.g., 7" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (IDR) *</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} min="0"
                  className={`w-full px-4 py-2.5 border rounded-lg outline-none ${errors.price ? 'border-red-300' : 'border-gray-200'}`}
                  placeholder="e.g., 5500000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price</label>
                <input type="number" name="discount_price" value={formData.discount_price} onChange={handleChange} min="0"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none" placeholder="Optional" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Travel Dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                <input type="date" name="departure_date" value={formData.departure_date} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                <input type="date" name="return_date" value={formData.return_date} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Includes & Excludes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What's Included</label>
                <textarea name="includes" value={formData.includes} onChange={handleChange} rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none resize-none"
                  placeholder="One item per line" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What's Excluded</label>
                <textarea name="excludes" value={formData.excludes} onChange={handleChange} rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none resize-none"
                  placeholder="One item per line" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Add Image</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300" />
                <span className="text-sm font-medium text-gray-700">Featured Package</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300" />
                <span className="text-sm font-medium text-gray-700">Active (Visible to customers)</span>
              </label>
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{errors.submit}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Link to="/admin/packages" className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 text-center">
              Cancel
            </Link>
            <button type="submit" disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating...</>
              ) : (
                <><Check className="w-5 h-5" /> Create Package</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
