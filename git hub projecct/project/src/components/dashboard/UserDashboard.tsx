import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowLeft, BarChart3, Users, Clock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useUserListings } from '../../hooks/useListings';
import CreateListingModal from '../listings/CreateListingModal';
import ListingCard from '../listings/ListingCard';

const UserDashboard: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const { listings, loading } = useUserListings(user?.uid);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleBackToHome = () => {
    window.location.reload();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to access your dashboard</h2>
        </div>
      </div>
    );
  }

  const activeListings = listings.filter(l => l.is_active && !l.is_rented);
  const rentedItems = listings.filter(l => l.is_rented);
  const inactiveListings = listings.filter(l => !l.is_active);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <button
                  onClick={handleBackToHome}
                  className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {profile.full_name}!
                  </h1>
                  <p className="text-gray-600">
                    Manage your rental listings and track your activity
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-orange-700 transition-all duration-300 flex items-center space-x-2 shadow-lg"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create Listing</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Listings</p>
                  <p className="text-2xl font-bold text-gray-900">{listings.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Active Listings</p>
                  <p className="text-2xl font-bold text-gray-900">{activeListings.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="bg-orange-100 rounded-full p-3 mr-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Rented Items</p>
                  <p className="text-2xl font-bold text-gray-900">{rentedItems.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="bg-gray-100 rounded-full p-3 mr-4">
                  <Clock className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Inactive</p>
                  <p className="text-2xl font-bold text-gray-900">{inactiveListings.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-xl p-4 text-left transition-colors group"
              >
                <Plus className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900">Add New Item</h3>
                <p className="text-sm text-gray-600">List a new item for rent</p>
              </button>

              <button className="bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-xl p-4 text-left transition-colors group">
                <BarChart3 className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900">View Analytics</h3>
                <p className="text-sm text-gray-600">Track your listing performance</p>
              </button>

              <button className="bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 rounded-xl p-4 text-left transition-colors group">
                <Users className="h-8 w-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900">Manage Rentals</h3>
                <p className="text-sm text-gray-600">View active rental requests</p>
              </button>
            </div>
          </div>

          {/* Listings */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Listings</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add New</span>
              </button>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your listings...</p>
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Plus className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No listings yet</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Start earning by renting out items you don't use every day. 
                  Create your first listing and join thousands of successful renters!
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-orange-700 transition-all duration-300 shadow-lg"
                >
                  Create Your First Listing
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Active Listings */}
                {activeListings.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Eye className="h-5 w-5 text-green-600 mr-2" />
                      Active Listings ({activeListings.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {activeListings.map(listing => (
                        <ListingCard
                          key={listing.id}
                          listing={listing}
                          showOwner={false}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Rented Items */}
                {rentedItems.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="h-5 w-5 text-orange-600 mr-2" />
                      Currently Rented ({rentedItems.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rentedItems.map(listing => (
                        <ListingCard
                          key={listing.id}
                          listing={listing}
                          showOwner={false}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Inactive Listings */}
                {inactiveListings.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <EyeOff className="h-5 w-5 text-gray-600 mr-2" />
                      Inactive Listings ({inactiveListings.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {inactiveListings.map(listing => (
                        <ListingCard
                          key={listing.id}
                          listing={listing}
                          showOwner={false}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateListingModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default UserDashboard;