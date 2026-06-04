import FavoriteButton from "@/components/atoms/FavoriteButton";
import { ThemedText } from "@/components/atoms/ThemedText";
import { View } from "react-native";

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
        <ThemedText weight="bold" className="text-base mb-2" style={{ color: "#33232C" }}>
          Descripción del producto
        </ThemedText>
        <ThemedText weight="regular" className="text-base leading-6" style={{ color: "#33232C" }}>
          {description}
        </ThemedText>
      </View>
      <View style={{ marginTop: -8 }}>
        <FavoriteButton isFavorite={isFavorite} onPress={onFavoritePress} />
      </View>
    </View>
  );
}