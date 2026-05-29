import { ImageSourcePropType } from "react-native";
import { CategoryId } from "../constants/categories";

export interface Product {
  id: string;
  name: string;
  image: ImageSourcePropType;
  categoryId: CategoryId;
  price?: number;
  description?: string;
  characteristics?: string[];
}
