import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, AlertCircle, ArrowDown } from 'lucide-react';
import { useListings } from '../hooks/useListings';
import { LISTING_CATEGORIES, ListingCategory } from '../lib/firebase';
import ListingCard from './listings/ListingCard';

// Sample data for demonstration
const sampleListings = [
  {
    id: 'sample-1',
    user_id: 'sample-user',
    title: 'Professional DSLR Camera with Lens Kit',
    category: 'Cameras',
    description: 'Canon EOS 5D Mark IV with 24-70mm lens. Perfect for photography projects, weddings, and events. Includes battery, charger, and memory card.',
    price_per_day: 1500,
    availability_start_date: '2024-12-21',
    location: 'Mumbai, Maharashtra',
    photos: ['https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500'],
    is_rented: false,
    is_active: true,
    created_at: '2024-12-20T10:00:00Z',
    updated_at: '2024-12-20T10:00:00Z',
    user: {
      id: 'sample-user',
      username: 'sampleuser',
      full_name: 'Sample User',
      email: 'sample@example.com',
      profile_picture_url: '',
      created_at: '2024-12-20T10:00:00Z',
      updated_at: '2024-12-20T10:00:00Z'
    }
  },
  {
    id: 'sample-2',
    user_id: 'sample-user-2',
    title: 'Mountain Bike - Trek X-Caliber 8',
    category: 'Vehicles',
    description: 'High-quality mountain bike perfect for trails and city rides. Well-maintained with recent tune-up. Helmet included.',
    price_per_day: 800,
    availability_start_date: '2024-12-21',
    location: 'Bangalore, Karnataka',
    photos: ['https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=500'],
    is_rented: false,
    is_active: true,
    created_at: '2024-12-20T11:00:00Z',
    updated_at: '2024-12-20T11:00:00Z',
    user: {
      id: 'sample-user-2',
      username: 'samplerenter',
      full_name: 'Sample Renter',
      email: 'renter@example.com',
      profile_picture_url: '',
      created_at: '2024-12-20T11:00:00Z',
      updated_at: '2024-12-20T11:00:00Z'
    }
  },
  {
    id: 'sample-3',
    user_id: 'sample-user-3',
    title: 'Gaming Laptop - ASUS ROG Strix',
    category: 'Electronics',
    description: 'High-performance gaming laptop with RTX 3070, 16GB RAM, 1TB SSD. Perfect for gaming, video editing, and intensive tasks.',
    price_per_day: 2000,
    availability_start_date: '2024-12-21',
    location: 'Delhi, NCR',
    photos: ['https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500'],
    is_rented: false,
    is_active: true,
    created_at: '2024-12-20T12:00:00Z',
    updated_at: '2024-12-20T12:00:00Z',
    user: {
      id: 'sample-user-3',
      username: 'techenthusiast',
      full_name: 'Tech Enthusiast',
      email: 'tech@example.com',
      profile_picture_url: '',
      created_at: '2024-12-20T12:00:00Z',
      updated_at: '2024-12-20T12:00:00Z'
    }
  },
  {
    id: 'sample-4',
    user_id: 'sample-user-4',
    title: 'Comfortable Sofa Set - 3+2 Seater',
    category: 'Furniture',
    description: 'Modern comfortable sofa set perfect for temporary accommodation or events. Clean and well-maintained.',
    price_per_day: 1200,
    availability_start_date: '2024-12-21',
    location: 'Pune, Maharashtra',
    photos: ['https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=500'],
    is_rented: false,
    is_active: true,
    created_at: '2024-12-20T13:00:00Z',
    updated_at: '2024-12-20T13:00:00Z',
    user: {
      id: 'sample-user-4',
      username: 'furnitureowner',
      full_name: 'Furniture Owner',
      email: 'furniture@example.com',
      profile_picture_url: '',
      created_at: '2024-12-20T13:00:00Z',
      updated_at: '2024-12-20T13:00:00Z'
    }
  },
  {
    id: 'sample-5',
    user_id: 'sample-user-5',
    title: 'Power Drill Set with Accessories',
    category: 'Tools',
    description: 'Professional power drill with complete accessory kit. Perfect for home improvement projects and construction work.',
    price_per_day: 500,
    availability_start_date: '2024-12-21',
    location: 'Chennai, Tamil Nadu',
    photos: ['https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=500'],
    is_rented: false,
    is_active: true,
    created_at: '2024-12-20T14:00:00Z',
    updated_at: '2024-12-20T14:00:00Z',
    user: {
      id: 'sample-user-5',
      username: 'toolowner',
      full_name: 'Tool Owner',
      email: 'tools@example.com',
      profile_picture_url: '',
      created_at: '2024-12-20T14:00:00Z',
      updated_at: '2024-12-20T14:00:00Z'
    }
  },
  {
    id: 'sample-6',
    user_id: 'sample-user-6',
    title: 'Acoustic Guitar - Yamaha F310',
    category: 'Musical Instruments',
    description: 'Beautiful acoustic guitar perfect for beginners and intermediate players. Includes guitar case and picks.',
    price_per_day: 300,
    availability_start_date: '2024-12-21',
    location: 'Hyderabad, Telangana',
    photos: ['https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=500'],
    is_rented: false,
    is_active: true,
    created_at: '2024-12-20T15:00:00Z',
    updated_at: '2024-12-20T15:00:00Z',
    user: {
      id: 'sample-user-6',
      username: 'musiclover',
      full_name: 'Music Lover',
      email: 'music@example.com',
      profile_picture_url: '',
      created_at: '2024-12-20T15:00:00Z',
      updated_at: '2024-12-20T15:00:00Z'
    }
  }
];

const RentalListings = () => {
  const [filters, setFilters] = useState({
    category: '' as ListingCategory | '',
    location: '',
    minPrice: '',
    maxPrice: '',
    searchQuery: '',
  });

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { listings: realListings, loading, error } = useListings({
    category: filters.category || undefined,
    location: filters.location || undefined,
    minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
    searchQuery: filters.searchQuery || undefined,
  });

  // Combine real listings with sample listings, prioritizing real listings
  const allListings = [...realListings, ...sampleListings];
  const hasRealListings = realListings.length > 0;

  // Listen for search from Hero component
  useEffect(() => {
    const handleHeroSearch = (event: CustomEvent) => {
      setFilters(prev => ({
        ...prev,
        searchQuery: event.detail
      }));
    };

    window.addEventListener('heroSearch', handleHeroSearch as EventListener);
    return () => window.removeEventListener('heroSearch', handleHeroSearch as EventListener);
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      searchQuery: '',
    });
  };

  const scrollToForm = () => {
    const element = document.getElementById('form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactListing = (listing: any) => {
    if (listing.id.startsWith('sample-')) {
      // For sample listings, redirect to form
      scrollToForm();
      return;
    }
    
    const message = `Hi! I'm interested in renting "${listing.title}" from KirayaWale. Could you please provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/916207797744?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  // Filter listings based on search criteria
  const filteredListings = allListings.filter(listing => {
    const matchesCategory = !filters.category || listing.category === filters.category;
    const matchesLocation = !filters.location || listing.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesMinPrice = !filters.minPrice || listing.price_per_day >= parseFloat(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || listing.price_per_day <= parseFloat(filters.maxPrice);
    const matchesSearch = !filters.searchQuery || 
      listing.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      listing.category.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesCategory && matchesLocation && matchesMinPrice && matchesMaxPrice && matchesSearch;
  });

  return (
    <section id="listings" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse <span className="text-blue-600">Rental Items</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover thousands of items available for rent across India
            </p>
          </div>

          {/* Sample Items Notice */}
          {!hasRealListings && (
            <div className="bg-gradient-to-r from-blue-50 to-orange-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    📋 Sample Items Display
                  </h3>
                  <p className="text-gray-700 mb-4">
                    These are <strong>sample items for demonstration purposes only</strong> - not real rental listings. 
                    To list your items for rent or find real rental items, please fill out the form below and get auto-connected with KirayaWale!
                  </p>
                  <button
                    onClick={scrollToForm}
                    className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-orange-700 transition-all duration-300 flex items-center space-x-2 shadow-lg"
                  >
                    <ArrowDown className="h-4 w-4" />
                    <span>Fill Form & Get Connected</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              {/* Enhanced Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for items..."
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </button>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Categories</option>
                      {LISTING_CATEGORIES.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter city..."
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Price (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Price (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="10000"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={clearFilters}
                    className="text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Clear All Filters
                  </button>
                  <span className="text-sm text-gray-500">
                    {filteredListings.length} items found
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Listings */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading items...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-600 mb-4">Error loading listings: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or fill the form below to get connected</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
                <button
                  onClick={scrollToForm}
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Fill Form & Get Connected
                </button>
              </div>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onContact={handleContactListing}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}

          {/* Call to Action */}
          {filteredListings.length > 0 && (
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Want to list your items or find specific rentals?
                </h3>
                <p className="text-gray-600 mb-6">
                  Fill out our form below and get auto-connected with KirayaWale for personalized rental solutions!
                </p>
                <button
                  onClick={scrollToForm}
                  className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-orange-700 transition-all duration-300 shadow-lg flex items-center space-x-2 mx-auto"
                >
                  <ArrowDown className="h-5 w-5" />
                  <span>Get Connected with KirayaWale</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RentalListings;