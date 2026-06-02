import { ImageSourcePropType, Pressable, Text } from "react-native";
import ProductImage from "../atoms/ProductImage";

interface ProductCardProps {
  name: string;
  image: ImageSourcePropType;
  onPress?: () => void;
}

export default function ProductCard({
  name,
  image,
  onPress,
}: ProductCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 m-1"
    >
      <ProductImage source={image} size="lg" />
      <Text
        className="text-sm text-gray-800 mt-2"
        numberOfLines={2}
      >
        {name}
      </Text>
    </Pressable>
  );
}
