import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc,
  serverTimestamp,
  QueryConstraint
} from 'firebase/firestore';
import { db, Listing, ListingCategory } from '../lib/firebase';

interface ListingFilters {
  category?: ListingCategory;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
}

export const useListings = (filters?: ListingFilters) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchListings();
  }, [filters]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      
      const constraints: QueryConstraint[] = [
        where('is_active', '==', true),
        orderBy('created_at', 'desc')
      ];

      // Apply filters
      if (filters?.category) {
        constraints.push(where('category', '==', filters.category));
      }

      if (filters?.minPrice) {
        constraints.push(where('price_per_day', '>=', filters.minPrice));
      }

      if (filters?.maxPrice) {
        constraints.push(where('price_per_day', '<=', filters.maxPrice));
      }

      const q = query(collection(db, 'listings'), ...constraints);
      const querySnapshot = await getDocs(q);
      
      let listingsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
        updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      })) as Listing[];

      // Apply client-side filters for complex queries
      if (filters?.location) {
        listingsData = listingsData.filter(listing => 
          listing.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }

      if (filters?.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        listingsData = listingsData.filter(listing => 
          listing.title.toLowerCase().includes(searchLower) ||
          listing.description.toLowerCase().includes(searchLower) ||
          listing.category.toLowerCase().includes(searchLower)
        );
      }

      // Fetch user data for each listing
      const listingsWithUsers = await Promise.all(
        listingsData.map(async (listing) => {
          try {
            const userDoc = await getDoc(doc(db, 'users', listing.user_id));
            if (userDoc.exists()) {
              return {
                ...listing,
                user: userDoc.data()
              };
            }
            return listing;
          } catch (error) {
            console.error('Error fetching user for listing:', error);
            return listing;
          }
        })
      );

      setListings(listingsWithUsers);
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createListing = async (listingData: Omit<Listing, 'id' | 'created_at' | 'updated_at' | 'is_rented' | 'is_active'>) => {
    try {
      const docRef = await addDoc(collection(db, 'listings'), {
        ...listingData,
        is_rented: false,
        is_active: true,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });

      // Refresh listings
      await fetchListings();
      return { id: docRef.id, ...listingData };
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  };

  const updateListing = async (id: string, updates: Partial<Listing>) => {
    try {
      await updateDoc(doc(db, 'listings', id), {
        ...updates,
        updated_at: serverTimestamp(),
      });
      
      // Refresh listings
      await fetchListings();
    } catch (error) {
      console.error('Error updating listing:', error);
      throw error;
    }
  };

  const deleteListing = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'listings', id));
      
      // Refresh listings
      await fetchListings();
    } catch (error) {
      console.error('Error deleting listing:', error);
      throw error;
    }
  };

  const markAsRented = async (id: string, isRented: boolean) => {
    return updateListing(id, { is_rented: isRented });
  };

  return {
    listings,
    loading,
    error,
    createListing,
    updateListing,
    deleteListing,
    markAsRented,
    refetch: fetchListings,
  };
};

export const useUserListings = (userId?: string) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchUserListings();
    }
  }, [userId]);

  const fetchUserListings = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      
      const q = query(
        collection(db, 'listings'),
        where('user_id', '==', userId),
        orderBy('created_at', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const listingsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
        updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      })) as Listing[];

      setListings(listingsData);
    } catch (error) {
      console.error('Error fetching user listings:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    listings,
    loading,
    refetch: fetchUserListings,
  };
};