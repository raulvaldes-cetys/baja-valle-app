import PriceText from "@/components/atoms/PriceText";
import { Text, View } from "react-native";

interface ProductPriceProps {
  price?: number;
}

export default function ProductPrice({ price }: ProductPriceProps) {
  return (
    <View className="mb-2">
      <Text className="text-lg font-bold text-gray-900 mb-2">
        Precio estimado ud.
      </Text>
      <PriceText price={price} className="text-base" />
      <View className="h-[1px] bg-gray-300 mt-4" />
    </View>
  );
}