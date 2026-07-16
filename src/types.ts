export interface Product {
  id: string;
  name: string;
  price: number;
  mrp: number;
  rating: number;
  category: string;
  imageType: string; // Used to select the custom vector line art SVG
  shortDesc: string;
  description: string;
  dimensions: string;
  material: string;
  finishes: string[];
  reviewsCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageType: string;
}

export type ActiveView = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'cart-page' 
  | 'wishlist' 
  | 'checkout' 
  | 'about-us' 
  | 'blog' 
  | 'contact-us' 
  | 'faqs' 
  | 'privacy' 
  | 'terms';
