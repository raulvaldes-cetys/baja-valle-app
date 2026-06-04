import FavoriteButton from "@/components/atoms/FavoriteButton";
import { Text, View } from "react-native";

interface ProductDescriptionProps {
  description: string;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
}

export default function ProductDescription({
  description,
  isFavorite = false,
  onFavoritePress,
}: ProductDescriptionProps) {
  return (
    <View className="flex-row justify-between items-start mb-8">
      <View className="flex-1 pr-2">
        <Text className="text-lg font-bold text-gray-900 mb-3">
          Descripción del producto
        </Text>
        <Text className="text-base text-gray-700 leading-6">{description}</Text>
      </View>
      <FavoriteButton isFavorite={isFavorite} onPress={onFavoritePress} />
    </View>
  );
}