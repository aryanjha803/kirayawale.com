import React, { useState } from 'react';
import { Send, User, Phone, Package, MapPin, Clock, FileText } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  itemType: string;
  description: string;
  city: string;
  duration: string;
  serviceType: 'lend' | 'rent' | '';
}

const RequirementForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    itemType: '',
    description: '',
    city: '',
    duration: '',
    serviceType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.itemType || !formData.serviceType) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Create WhatsApp message
    const message = `Hello! I'm interested in ${formData.serviceType === 'lend' ? 'lending' : 'renting'} through KirayaWale - India's first P2P rental platform.

📝 My Details:
Name: ${formData.name}
Phone: ${formData.phone}
City: ${formData.city}

🏷️ Item Details:
Type: ${formData.itemType}
Service: ${formData.serviceType === 'lend' ? 'I want to LEND this item' : 'I want to RENT this item'}
Duration: ${formData.duration}

📋 Description:
${formData.description}

Please contact me to proceed with the rental process. Thank you!`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/916207797744?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Reset form after a short delay
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        itemType: '',
        description: '',
        city: '',
        duration: '',
        serviceType: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="form" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Want to <span className="text-orange-600">Lend</span> or <span className="text-blue-600">Rent</span> in India?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Fill the form below for electronics, bikes, furniture, tools rental and we'll connect you with the right people through WhatsApp on India's first P2P rental platform!
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl p-8 md:p-12 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6" role="form" aria-label="Rental request form">
              {/* Service Type Selection */}
              <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <legend className="sr-only">Choose rental service type</legend>
                <label className={`relative flex items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.serviceType === 'lend' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 bg-white hover:border-orange-300'
                }`}>
                  <input
                    type="radio"
                    name="serviceType"
                    value="lend"
                    checked={formData.serviceType === 'lend'}
                    onChange={handleInputChange}
                    className="sr-only"
                    aria-describedby="lend-description"
                  />
                  <div className="text-center">
                    <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Package className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">I want to LEND</h3>
                    <p id="lend-description" className="text-gray-600 text-sm">Share your electronics, bikes, furniture, tools with others in India</p>
                  </div>
                </label>

                <label className={`relative flex items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.serviceType === 'rent' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}>
                  <input
                    type="radio"
                    name="serviceType"
                    value="rent"
                    checked={formData.serviceType === 'rent'}
                    onChange={handleInputChange}
                    className="sr-only"
                    aria-describedby="rent-description"
                  />
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">I want to RENT</h3>
                    <p id="rent-description" className="text-gray-600 text-sm">Find electronics, bikes, furniture, tools you need in India</p>
                  </div>
                </label>
              </fieldset>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                    placeholder="Enter your full name"
                    aria-required="true"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                    placeholder="Enter your phone number"
                    aria-required="true"
                  />
                </div>

                {/* Item Type */}
                <div>
                  <label htmlFor="itemType" className="block text-sm font-semibold text-gray-700 mb-2">
                    <Package className="inline h-4 w-4 mr-2" />
                    Type of Item *
                  </label>
                  <input
                    type="text"
                    id="itemType"
                    name="itemType"
                    value={formData.itemType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                    placeholder="e.g., Camera, Bike, Furniture, Tools, Electronics"
                    aria-required="true"
                  />
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-2" />
                    City in India
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                    placeholder="Enter your city (Mumbai, Delhi, Bangalore, etc.)"
                  />
                </div>

                {/* Duration */}
                <div className="md:col-span-2">
                  <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="inline h-4 w-4 mr-2" />
                    Rental Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                    placeholder="e.g., 1 week, 3 days, 1 month"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    <FileText className="inline h-4 w-4 mr-2" />
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900 resize-none"
                    placeholder="Provide more details about the electronics, bikes, furniture, tools or your rental requirements in India..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 mx-auto"
                  aria-label="Submit rental request and contact via WhatsApp"
                >
                  <Send className="h-5 w-5" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit & Contact via WhatsApp'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequirementForm;