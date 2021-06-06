export interface IProduct {
  _id: string;
  title: string;
  brand: string;
  slug: string;
  rating: number;
  price: number;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductFilter {
  category?: string;
  brands?: string[];
}

export interface ICartItem {
  uid: number;
  product: IProduct;
  quantity: number;
}

export interface ProductState {
  fetchProductsStatus: "idle" | "loading" | "success" | "fail";
  fetchProductStatus: "idle" | "loading" | "success" | "fail";
  products: IProduct[];
  cart: ICartItem[];
  cartTotal: number;
  product: IProduct | null;
  categoryFilter: string | undefined;
}
