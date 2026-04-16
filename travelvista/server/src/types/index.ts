import { Request } from 'express';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  category: 'Tourist Spot' | 'Restaurant' | 'Hotel';
  images: string; // JSON array string
  rating: number;
  tags: string; // JSON array string
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  comment: string;
  rating: number;
  user_id: string;
  place_id: string;
  created_at: string;
  updated_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  place_id: string;
  created_at: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
