import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={24}
        color={isFavorite ? "#E63946" : "#E63946"}
      />
    </Pressable>
  );
}
