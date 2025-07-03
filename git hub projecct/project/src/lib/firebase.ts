import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD1l6_gSWmnRbatUcQvfrafcWpUWkLAugY",
  authDomain: "kirayawale-f953c.firebaseapp.com",
  projectId: "kirayawale-f953c",
  storageBucket: "kirayawale-f953c.firebasestorage.app",
  messagingSenderId: "814181409344",
  appId: "1:814181409344:web:74d48e651750a4550f75a5",
  measurementId: "G-2DL5K3Q250"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configure Google Auth Provider with proper scopes
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline'
});

// Add required scopes for profile information
googleProvider.addScope('profile');
googleProvider.addScope('email');

export default app;

// Database types
export interface User {
  id: string;
  username: string;
  full_name: string;
  email: string;
  phone_number?: string;
  city?: string;
  profile_picture_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Listing {
  id: string;
  user_id: string;
  title: string;
  category: string;
  description: string;
  price_per_day: number;
  availability_start_date: string;
  availability_end_date?: string;
  location: string;
  photos: string[];
  is_rented: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface Message {
  id: string;
  listing_id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Report {
  id: string;
  listing_id: string;
  reporter_id: string;
  reason: string;
  description?: string;
  status: string;
  created_at: string;
}

export interface Rating {
  id: string;
  listing_id: string;
  rater_id: string;
  rated_user_id: string;
  rating: number;
  review?: string;
  created_at: string;
}

// Categories for listings
export const LISTING_CATEGORIES = [
  'Electronics',
  'Furniture',
  'Vehicles',
  'Tools',
  'Sports Equipment',
  'Musical Instruments',
  'Cameras',
  'Books',
  'Clothing',
  'Home Appliances',
  'Other'
] as const;

export type ListingCategory = typeof LISTING_CATEGORIES[number];