export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  in_stock: boolean;
  category: { id: string; name: string; slug: string };
  brand: { id: string; name: string; slug: string };
};

export type ProductsPage = {
  current_page: number;
  data: Product[];
  last_page: number;
  per_page: number;
  total: number;
};
