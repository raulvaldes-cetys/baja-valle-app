import { ThemedText } from "@/components/atoms/ThemedText";
import { View } from "react-native";

interface BulletItemProps {
  text: string;
}

export default function BulletItem({ text }: BulletItemProps) {
  return (
    <View className="flex-row items-start gap-2 mb-1">
      <ThemedText weight="regular" className="text-gray-800 text-sm mt-0.5">•</ThemedText>
      <ThemedText weight="regular" className="text-gray-800 text-sm flex-1">{text}</ThemedText>
    </View>
  );
}