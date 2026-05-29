import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

interface IconContainerProps {
  iconName: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  size?: number;
  iconColor?: string;
}

export default function IconContainer({
  iconName,
  backgroundColor,
  size = 56,
  iconColor = "#ffffff",
}: IconContainerProps) {
  return (
    <View
      style={{
        backgroundColor,
        width: size,
        height: size,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons name={iconName} size={size * 0.46} color={iconColor} />
    </View>
  );
}
