export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  benefits: string[];
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
}