import MinusIconSvg from "@/assets/expo.icon/Assets/minus-icon.svg";
import PlusIconSvg from "@/assets/expo.icon/Assets/plus-icon.svg";
import FooterDecorationSvg from "@/assets/images/footer-decoration.svg";
import { ThemedButton } from "@/components/atoms/ThemedButton";
import { ThemedText } from "@/components/atoms/ThemedText";
import { useState } from "react";
import { Pressable, View } from "react-native";

interface QuoteProps {
  productName: string;
  onAddToCart?: (quantity: number) => void;
}

const QUICK_ADD = [10, 25, 50, 100];

export default function Quote({ productName, onAddToCart }: QuoteProps) {
  const [quantity, setQuantity] = useState(10);

  return (
    <View className="flex-1 bg-[#512432] px-14 pt-6 pb-20 min-h-[400px]">
      <View className="absolute bottom-0 left-0 right-0">
        <FooterDecorationSvg width="100%" height={160} preserveAspectRatio="xMidYMin slice" />
      </View>

      <View className="flex-1 gap-6">
        <ThemedText weight="bold" className="text-white text-2xl text-center">
          ¡COTIZA AHORA!
        </ThemedText>

        <ThemedText weight="regular" className="text-white text-base text-center">
          {productName}
        </ThemedText>

        <View className="flex-row items-center self-stretch bg-white rounded-[30px] px-8 py-1.5 gap-8">
          <Pressable
            onPress={() => { if (quantity > 1) setQuantity((q) => q - 1); }}
            hitSlop={12}
          >
            <MinusIconSvg width={20} height={2} color="#512432" />
          </Pressable>
          <ThemedText weight="regular" className="text-[#512432] text-3xl flex-1 text-center">
            {quantity.toLocaleString()}
          </ThemedText>
          <Pressable onPress={() => setQuantity((q) => q + 1)} hitSlop={12}>
            <PlusIconSvg width={20} height={20} color="#512432" />
          </Pressable>
        </View>

        <View className="gap-2">
          <ThemedText weight="semibold" className="text-white text-sm text-center">
            Agregar rápido
          </ThemedText>
          <View className="flex-row gap-4">
            {QUICK_ADD.map((amount) => (
              <Pressable
                key={amount}
                onPress={() => setQuantity((q) => q + amount)}
                className="flex-1 items-center bg-white rounded-full py-1"
              >
                <ThemedText weight="semibold" className="text-[#512432] text-sm">
                  +{amount}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        <ThemedButton variant="pill" className="mt-4" onPress={() => onAddToCart?.(quantity)}>
          AGREGAR AL CARRITO
        </ThemedButton>
      </View>
    </View>
  );
}
