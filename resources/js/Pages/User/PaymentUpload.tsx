import { useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  FileText, 
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';

interface BankAccount {
  id: number;
  bank_name: string;
  account_holder_name: string;
  account_number: string;
  branch_name: string;
}

const mockBankAccounts: BankAccount[] = [
  {
    id: 1,
    bank_name: 'Bank Central Asia (BCA)',
    account_holder_name: 'PT Travel Booking Indonesia',
    account_number: '1234567890',
    branch_name: 'Jakarta Pusat',
  },
  {
    id: 2,
    bank_name: 'Bank Mandiri',
    account_holder_name: 'PT Travel Booking Indonesia',
    account_number: '9876543210',
    branch_name: 'Jakarta Selatan',
  },
];

const mockBooking = {
  id: 1,
  booking_number: 'BK-DEF456-20240502',
  total_amount: 7800000,
  payment_status: 'pending',
};

export default function PaymentUpload() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedBank, setSelectedBank] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFilePreview, setUploadedFilePreview] = useState<string | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, file: 'File size must be less than 5MB' });
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, file: 'File must be JPEG, PNG, WebP, or PDF' });
        return;
      }

      setUploadedFile(file);
      setUploadedFilePreview(URL.createObjectURL(file));
      setErrors({ ...errors, file: '' });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const fakeEvent = {
        target: { files: [file] },
      } as any;
      handleFileSelect(fakeEvent);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (uploadedFilePreview) {
      URL.revokeObjectURL(uploadedFilePreview);
    }
    setUploadedFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!uploadedFile) {
      newErrors.file = 'Please upload payment proof';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      
      // Redirect after showing success
      setTimeout(() => {
        navigate('/user/bookings');
      }, 3000);
    } catch (error) {
      setErrors({ submit: 'Failed to submit payment. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your payment proof has been uploaded successfully. We will verify your payment within 1x24 hours.
          </p>
          <Link
            to="/user/bookings"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            View Bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            to={`/user/bookings/${id}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Booking
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Upload Payment</h1>
          <p className="text-gray-600 mt-1">
            Complete your payment for booking {mockBooking.booking_number}
          </p>
        </div>

        {/* Amount Due */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Amount to Pay</p>
              <p className="text-3xl font-bold text-blue-900 mt-1">
                {formatCurrency(mockBooking.total_amount)}
              </p>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Info className="w-5 h-5" />
              <span className="text-sm">Please pay the exact amount</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Method Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Bank Transfer</span>
              </label>
            </div>
          </div>

          {/* Bank Account Selection */}
          {paymentMethod === 'bank_transfer' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Bank Account</h2>
              <div className="space-y-3">
                {mockBankAccounts.map((bank) => (
                  <label
                    key={bank.id}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedBank === bank.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="bank"
                      value={bank.id}
                      checked={selectedBank === bank.id}
                      onChange={() => setSelectedBank(bank.id)}
                      className="mt-1 w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{bank.bank_name}</p>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p>Account Number: <span className="font-medium text-gray-900">{bank.account_number}</span></p>
                        <p>Account Holder: <span className="font-medium text-gray-900">{bank.account_holder_name}</span></p>
                        <p>Branch: <span className="font-medium text-gray-900">{bank.branch_name}</span></p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Payment Proof Upload */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Payment Proof</h2>
            
            {!uploadedFile ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  errors.file
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <Upload className={`w-10 h-10 mx-auto mb-3 ${errors.file ? 'text-red-400' : 'text-gray-400'}`} />
                <p className="text-gray-600 font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  JPEG, PNG, WebP, or PDF (max 5MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  {uploadedFile.type.startsWith('image/') ? (
                    <img
                      src={uploadedFilePreview || ''}
                      alt="Payment proof preview"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 truncate">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            
            {errors.file && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.file}
              </p>
            )}
          </div>

          {/* Additional Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes (Optional)</h2>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Any additional information about your payment..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700">{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3">
            <Link
              to={`/user/bookings/${id}`}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Submit Payment
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
