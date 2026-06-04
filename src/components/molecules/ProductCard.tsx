import { router } from "expo-router";
import { ImageSourcePropType, Pressable } from "react-native";
import ProductImage from "../atoms/ProductImage";
import { ThemedText } from "../atoms/ThemedText";

interface ProductCardProps {
  id: string;
  name: string;
  image: ImageSourcePropType;
  onPress?: () => void;
}

export default function ProductCard({
  id,
  name,
  image,
}: ProductCardProps) {
  return (
    <Pressable
      onPress={() => router.push(`/product/${id}` as any)}
      className="flex-1 m-1"
    >
      <ProductImage source={image} size="lg" />
      <ThemedText
        weight="regular"
        className="text-sm text-gray-800 mt-2"
        numberOfLines={2}
      >
        {name.toUpperCase()}
      </ThemedText>
    </Pressable>
  );
}