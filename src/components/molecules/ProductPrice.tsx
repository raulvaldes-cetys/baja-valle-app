import PriceText from "@/components/atoms/PriceText";
import { ThemedText } from "@/components/atoms/ThemedText";
import { View } from "react-native";

interface ProductPriceProps {
  price?: number;
}

export default function ProductPrice({ price }: ProductPriceProps) {
  return (
    <View className="mb-6">
      <ThemedText weight="bold" className="text-lg mb-2" style={{ color: "#33232C" }}>
        Precio estimado ud.
      </ThemedText>
      <PriceText price={price} className="text-base" />
    </View>
  );
}