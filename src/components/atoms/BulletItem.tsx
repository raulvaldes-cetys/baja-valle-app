import { Text, View } from "react-native";

interface BulletItemProps {
  text: string;
}

export default function BulletItem({ text }: BulletItemProps) {
  return (
    <View className="flex-row items-start gap-2 mb-1">
      <Text className="text-gray-800 text-sm mt-0.5">•</Text>
      <Text className="text-gray-800 text-sm flex-1">{text}</Text>
    </View>
  );
}
