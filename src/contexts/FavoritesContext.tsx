import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ProductsListItem } from "../api/types/api-types";

const STORAGE_KEY = "@baja_valle_favorites";

interface FavoritesContextType {
  favorites: ProductsListItem[];
  addFavorite: (product: ProductsListItem) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<ProductsListItem[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) setFavorites(JSON.parse(raw));
    });
  }, []);

  function persist(items: ProductsListItem[]) {
    setFavorites(items);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function addFavorite(product: ProductsListItem) {
    if (favorites.some((f) => f.id === product.id)) return;
    persist([...favorites, product]);
  }

  function removeFavorite(id: number) {
    persist(favorites.filter((f) => f.id !== id));
  }

  function isFavorite(id: number) {
    return favorites.some((f) => f.id === id);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
}
