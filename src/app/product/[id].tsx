import { useLocalSearchParams } from "expo-router";
import ProductDetailScreen from "@/components/organisms/ProductDetailScreen";
import { MOCK_PRODUCTS } from "@/constants/mockProducts";

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) return null;

  return <ProductDetailScreen product={product} />;
}