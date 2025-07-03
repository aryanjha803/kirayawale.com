import React, { useState } from 'react';
import { Search, Plus, TrendingUp, Users, Shield } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface HeroProps {
  onAuthClick: (mode: 'signin' | 'signup') => void;
  user: FirebaseUser | null;
}

const Hero: React.FC<HeroProps> = ({ onAuthClick, user }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToListings = () => {
    const element = document.getElementById('listings');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToForm = () => {
    const element = document.getElementById('form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Scroll to listings section and trigger search
      scrollToListings();
      // Dispatch custom event with search query
      window.dispatchEvent(new CustomEvent('heroSearch', { detail: searchQuery }));
    } else {
      scrollToListings();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-orange-50 py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Rent What You Need.
              <span className="block text-blue-600">Lend What You Don't.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              India's smartest rental marketplace. From cameras to bikes, furniture to tools - 
              find everything you need or earn from what you own.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="What are you looking for? (Camera, Bike, Furniture...)"
                  className="w-full pl-14 pr-32 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                />
                <button 
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={scrollToListings}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Browse Items</span>
              </button>
              
              <button 
                onClick={() => user ? scrollToForm() : onAuthClick('signup')}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>{user ? 'List Your Item' : 'Start Earning'}</span>
              </button>
            </div>

            {/* Quick Start for New Users */}
            {!user && (
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 mb-12 shadow-xl">
                <h2 className="text-2xl font-bold mb-2">New to KirayaWale?</h2>
                <p className="text-orange-100 mb-4">Join thousands of Indians who are earning and saving through smart rentals!</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    onClick={() => onAuthClick('signup')}
                    className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors shadow-lg"
                  >
                    Sign Up in 30 Seconds
                  </button>
                  <button 
                    onClick={() => onAuthClick('signin')}
                    className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors border-2 border-white"
                  >
                    Already Have Account?
                  </button>
                </div>
              </div>
            )}

            {/* Existing User CTA */}
            {user && (
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl p-6 mb-12 shadow-xl">
                <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
                <p className="text-green-100 mb-4">Ready to list your items or find what you need?</p>
                <button 
                  onClick={scrollToForm}
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg"
                >
                  Post Your First Item
                </button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Items Available</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Happy Users</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Secure Transactions</p>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Electronics', emoji: '📱' },
                { name: 'Bikes', emoji: '🚲' },
                { name: 'Furniture', emoji: '🪑' },
                { name: 'Tools', emoji: '🔧' },
                { name: 'Cameras', emoji: '📷' },
                { name: 'Sports', emoji: '⚽' },
              ].map((category, index) => (
                <button
                  key={index}
                  onClick={scrollToListings}
                  className="bg-gray-50 hover:bg-blue-50 p-4 rounded-xl text-center transition-colors group"
                >
                  <div className="text-3xl mb-2">{category.emoji}</div>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                    {category.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;