import BulletItem from "@/components/atoms/BulletItem";
import { ThemedText } from "@/components/atoms/ThemedText";
import { View } from "react-native";

interface ProductCharacteristicsProps {
  characteristics: string[];
}

export default function ProductCharacteristics({
  characteristics,
}: ProductCharacteristicsProps) {
  return (
    <View className="mb-4">
      <ThemedText weight="bold" className="text-lg mb-2" style={{ color: "#33232C" }}>
        Características
      </ThemedText>
      {characteristics.map((item, index) => (
        <BulletItem key={index} text={item} />
      ))}
    </View>
  );
}