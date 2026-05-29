import IconContainer from "@/components/atoms/IconContainer";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

interface CategoryTabProps {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  isActive?: boolean;
  onPress?: () => void;
}

export default function CategoryTab({
  label,
  iconName,
  backgroundColor,
  isActive = false,
  onPress,
}: CategoryTabProps) {
  return (
    <Pressable
      onPress={onPress}
      className="items-center gap-1.5 px-1"
    >
      <IconContainer
        iconName={iconName}
        backgroundColor={backgroundColor}
        size={isActive ? 60 : 56}
      />
      <Text
        className="text-xs text-center max-w-[72px]"
        style={{ fontWeight: isActive ? "600" : "400" }}
        numberOfLines={2}
      >
        {label}
      </Text>
    </Pressable>
  );
}

// import { Pressable, Text } from "react-native";
// import IconContainer from "@/components/atoms/IconContainer";
// import type { ComponentProps } from "react";

// interface CategoryTabProps {
//   label: string;
//   iconName: ComponentProps<typeof IconContainer>["iconName"];
//   backgroundColor: string;
//   isActive?: boolean;
//   onPress?: () => void;
// }