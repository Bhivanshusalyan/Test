export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  created_at?: string;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  category: 'Tourist Spot' | 'Restaurant' | 'Hotel';
  images: string[];
  rating: number;
  tags: string[];
  latitude: number;
  longitude: number;
  created_at?: string;
  reviews?: Review[];
}

export interface Review {
  id: string;
  comment: string;
  rating: number;
  user_id: string;
  place_id: string;
  user_name: string;
  created_at: string;
  updated_at?: string;
}

export interface Favorite {
  favorite_id: string;
  favorited_at: string;
  id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  category: string;
  images: string[];
  rating: number;
  tags: string[];
  latitude: number;
  longitude: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: any;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PlaceQuery {
  search?: string;
  category?: string;
  tags?: string;
  minRating?: string;
  sortBy?: 'rating' | 'name' | 'created_at';
  order?: 'asc' | 'desc';
  page?: string;
  limit?: string;
}
