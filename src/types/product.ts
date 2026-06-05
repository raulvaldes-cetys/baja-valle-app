export interface Product {
  id: string;
  name: string;
  imageUrl: string | null;
  categoryId: number;
  price?: number;
  description?: string;
  characteristics?: string[];
  Quantity?: number;
}
