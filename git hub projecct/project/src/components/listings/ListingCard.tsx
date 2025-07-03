import React from 'react';
import { Calendar, MapPin, User, Heart, Phone } from 'lucide-react';
import { Listing } from '../../lib/firebase';

interface ListingCardProps {
  listing: Listing;
  onContact?: (listing: Listing) => void;
  showOwner?: boolean;
  viewMode?: 'grid' | 'list';
}

const ListingCard: React.FC<ListingCardProps> = ({ 
  listing, 
  onContact, 
  showOwner = true,
  viewMode = 'grid'
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden">
        <div className="flex">
          <div className="w-48 h-32 flex-shrink-0">
            {listing.photos && listing.photos.length > 0 ? (
              <img 
                src={listing.photos[0]} 
                alt={listing.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {listing.category}
                  </span>
                  {listing.is_rented && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      Rented
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{listing.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">{listing.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Available from {formatDate(listing.availability_start_date)}</span>
                  </div>
                  {showOwner && listing.user && (
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>By {listing.user.full_name}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {formatPrice(listing.price_per_day)}
                  <span className="text-sm text-gray-500 font-normal">/day</span>
                </div>
                
                {onContact && (
                  <button
                    onClick={() => onContact(listing)}
                    disabled={listing.is_rented}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{listing.is_rented ? 'Rented' : 'Contact'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-200 group">
      <div className="relative overflow-hidden">
        {listing.photos && listing.photos.length > 0 ? (
          <img 
            src={listing.photos[0]} 
            alt={listing.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center">
            <span className="text-gray-500 text-lg">No Image</span>
          </div>
        )}
        
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <span className="text-xs font-medium text-gray-700">{listing.category}</span>
        </div>
        
        {listing.is_rented && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Rented
          </div>
        )}
        
        <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{listing.title}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2 text-sm leading-relaxed">{listing.description}</p>
        
        <div className="space-y-1 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{listing.location}</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Available from {formatDate(listing.availability_start_date)}</span>
          </div>
          
          {showOwner && listing.user && (
            <div className="flex items-center text-gray-500 text-sm">
              <User className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">By {listing.user.full_name}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-blue-600">
              {formatPrice(listing.price_per_day)}
            </span>
            <span className="text-gray-500 text-sm ml-1">/day</span>
          </div>
          
          {onContact && (
            <button
              onClick={() => onContact(listing)}
              disabled={listing.is_rented}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <Phone className="h-4 w-4" />
              <span>{listing.is_rented ? 'Rented' : 'Contact'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;