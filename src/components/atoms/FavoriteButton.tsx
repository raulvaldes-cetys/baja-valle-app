import { FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native";

interface FavoriteButtonProps {
  isFavorite?: boolean;
  onPress?: () => void;
}

export default function FavoriteButton({
  isFavorite = false,
  onPress,
}: FavoriteButtonProps) {
  return (
    <Pressable onPress={onPress} className="p-2">
      <FontAwesome
        name={isFavorite ? "heart" : "heart-o"}
        size={24}
        color={isFavorite ? "#E63946" : "#E63946"}
      />
    </Pressable>
  );
}
