import FavoritesSvg from "@/assets/expo.icon/Assets/favorites.svg";
import { Pressable } from "react-native";

interface FavoriteButtonProps {
  isFavorite?: boolean;
  onPress?: () => void;
}

export default function FavoriteButton({ isFavorite = false, onPress }: FavoriteButtonProps) {
  return (
    <Pressable onPress={onPress} className="p-2">
      <FavoritesSvg
        width={24}
        height={24}
        color={isFavorite ? "#E63946" : "#9CA3AF"}
        fill={isFavorite ? "#E63946" : "none"}
      />
    </Pressable>
  );
}
