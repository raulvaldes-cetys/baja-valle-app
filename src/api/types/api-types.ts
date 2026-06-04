export interface ProductsListResponse {
  products: ProductsListItem[];
}

export interface ProductsListItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string | null;
  categoryId: number;
}

export interface ProductByIdResponse {
  id: number;
  name: string;
  description: string | null;
  features: string[] | null;
  specifications: string | null;
  price: number;
  imageUrl: string | null;
}

export interface CategoriesListResponse {
  categories: CategoryListItem[];
}

export interface CategoryListItem {
  id: number;
  name: string;
  color: string;
  iconUrl: string;
}

export interface ContactMailBody {
  nombre: string;
  apellido: string;
  correo: string;
  mensaje: string;
}

export interface CartItem {
  nombre: string;
  cantidad: number;
}

export interface CartMailBody {
  nombre: string;
  apellido: string;
  correo: string;
  ubicacion: string;
  items: CartItem[];
}