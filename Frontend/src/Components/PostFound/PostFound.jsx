import { useState, useEffect } from 'react';
import { AlertCircle, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { client } from '../../api/auth';
import { Found } from '../../api/post';

export default function PostFound() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchClient = async () => {
      try {
        await client();
      } catch (error) {
        console.error("Error fetching client:", error);
        navigate("/login");
      }
    };
    fetchClient();
  }, [navigate]);

  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    description: '',
    verificationHint: '',
    dateFound: '',
    timeFound: '',
    timePeriod: '',
    location: '',
  });
  
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategoryValue, setCustomCategoryValue] = useState('');
  
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'category') {
      if (value === 'Other') {
        setShowCustomCategory(true);
        setFormData(prev => ({ ...prev, [name]: '' }));
      } else {
        setShowCustomCategory(false);
        setCustomCategoryValue('');
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCustomCategoryChange = (e) => {
    const value = e.target.value;
    setCustomCategoryValue(value);
    setFormData(prev => ({ ...prev, category: value }));
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.itemName.trim()) {
      newErrors.itemName = 'Item name is required';
    }
    
    if (!formData.category || !formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.verificationHint.trim()) {
      newErrors.verificationHint = 'Verification hint is required';
    }
    
    if (!formData.dateFound) {
      newErrors.dateFound = 'Date found is required';
    }
    
    if (!formData.timeFound) {
      newErrors.timeFound = 'Time is required';
    }
    
    if (!formData.timePeriod) {
      newErrors.timePeriod = 'AM/PM is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!imageFile) {
      newErrors.image = 'Image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    
    const submissionData = {
      fItemName: formData.itemName,
      fCategory: formData.category,
      fDescription: formData.description,
      fverificationHint: formData.verificationHint,
      fDateFound: formData.dateFound,
      fApproxTime: `${formData.timeFound} ${formData.timePeriod}`,
      fLocation: formData.location,
      fImage: imageFile ? imageFile.name : null, 
    };

    try {
      const res = await Found(submissionData);
      console.log('Form Submitted:', res.data);
      alert('Found item report submitted successfully!');

      setFormData({
        itemName: '',
        category: '',
        description: '',
        verificationHint: '',
        dateFound: '',
        timeFound: '',
        timePeriod: '',
        location: '',
      });
      setImageFile(null);
      setImagePreview(null);
      setShowCustomCategory(false);
      setCustomCategoryValue('');
      setImageFile(null);
      setImagePreview(null);
      navigate("/dashboard");

    } catch (error) {
      console.error("Error submitting found item:", error);
      alert("Error submitting found item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Found Item</h1>
            <p className="text-gray-600">Fill out the form below to report an item you found</p>
          </div>

          <div className="space-y-6">
            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.itemName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Black Leather Wallet"
              />
              {errors.itemName && (
                <div className="mt-1 flex items-center text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.itemName}
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={showCustomCategory ? 'Other' : formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                <option value="Wallet">Wallet</option>
                <option value="Phone">Phone</option>
                <option value="ID Card">ID Card</option>
                <option value="Bag">Bag</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && !showCustomCategory && (
                <div className="mt-1 flex items-center text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.category}
                </div>
              )}
              
              {/* Custom Category Input - Shows when "Other" is selected */}
              {showCustomCategory && (
                <div className="mt-3">
                  <input
                    type="text"
                    name="customCategory"
                    value={customCategoryValue}
                    onChange={handleCustomCategoryChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Please specify the category"
                  />
                  {errors.category && (
                    <div className="mt-1 flex items-center text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.category}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe the item in detail: color, brand, unique marks, contents (money/cards), etc."
              />
              {errors.description && (
                <div className="mt-1 flex items-center text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.description}
                </div>
              )}
            </div>

            {/* Verification Hint - NEW FIELD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Hint <span className="text-red-500">*</span>
              </label>
              <textarea
                name="verificationHint"
                value={formData.verificationHint}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none ${
                  errors.verificationHint ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Add a verification question to help identify the rightful owner. E.g., 'What was inside the wallet?' or 'What brand is the phone?'"
              />
              <p className="mt-1 text-xs text-gray-500">
                This hint will be used to verify the owner's identity.
              </p>
              {errors.verificationHint && (
                <div className="mt-1 flex items-center text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.verificationHint}
                </div>
              )}
            </div>

            {/* Date Found */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Found <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateFound"
                value={formData.dateFound}
                onChange={handleInputChange}
                max={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.dateFound ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dateFound && (
                <div className="mt-1 flex items-center text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.dateFound}
                </div>
              )}
            </div>

            {/* Approximate Time Found */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approximate Time <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="time"
                    name="timeFound"
                    value={formData.timeFound}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      errors.timeFound ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.timeFound && (
                    <div className="mt-1 flex items-center text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.timeFound}
                    </div>
                  )}
                </div>
                <div>
                  <select
                    name="timePeriod"
                    value={formData.timePeriod}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      errors.timePeriod ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                  {errors.timePeriod && (
                    <div className="mt-1 flex items-center text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.timePeriod}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Location Found */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location Found <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Central Park near the fountain"
              />
              {errors.location && (
                <div className="mt-1 flex items-center text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.location}
                </div>
              )}
            </div>

            {/* Image Upload - Required */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image <span className="text-red-500">*</span>
              </label>
              
              {!imagePreview ? (
                <div>
                  <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                    errors.image ? 'border-red-500' : 'border-gray-300'
                  }`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">Click to upload image</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  {errors.image && (
                    <div className="mt-1 flex items-center text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.image}
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition ${
                isSubmitting
                  ? 'bg-green-500 opacity-50 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Found Item Report'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}