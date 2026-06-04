import FooterDecorationSvg from "@/assets/images/footer-decoration.svg";
import { ThemedText } from "@/components/atoms/ThemedText";
import { useState } from "react";
import { Pressable, View } from "react-native";

interface QuoteProps {
  productName: string;
  onAddToCart?: (quantity: number) => void;
}

const QUANTITIES = [100, 500, 1000, 5000];
const BG = "#512432";

export default function Quote({ productName, onAddToCart }: QuoteProps) {
  const [quantity, setQuantity] = useState(1000);
  const [open, setOpen] = useState(false);

  return (
    <View className="flex-1 px-12" style={{ minHeight: 400, backgroundColor: BG }}>
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <FooterDecorationSvg width="100%" height={160} preserveAspectRatio="xMidYMin slice" />
      </View>

      <View className="flex-1 justify-center pb-20">
        <ThemedText weight="bold" className="text-white text-2xl text-center mb-6">
          ¡COTIZA AHORA!
        </ThemedText>

        <View className="flex-row items-center gap-6 mb-8">
          <View>
            <Pressable
              onPress={() => setOpen(!open)}
              style={{ borderRadius: 19, backgroundColor: "white" }}
              className="px-6 py-3"
            >
              <ThemedText weight="regular" className="text-sm" style={{ color: BG }}>
                {quantity.toLocaleString()} ▾
              </ThemedText>
            </Pressable>
            {open && (
              <View className="absolute top-12 left-0 bg-white rounded-2xl shadow z-10 w-24 overflow-hidden">
                {QUANTITIES.map((q) => (
                  <Pressable
                    key={q}
                    onPress={() => { setQuantity(q); setOpen(false); }}
                    className="px-3 py-2"
                  >
                    <ThemedText weight="regular" className="text-gray-800 text-sm">
                      {q.toLocaleString()}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
          <ThemedText weight="semibold" className="text-white text-xl flex-1">
            {productName}
          </ThemedText>
        </View>

        <Pressable
          onPress={() => onAddToCart?.(quantity)}
          className="bg-white rounded-full py-3 items-center"
        >
          <ThemedText weight="bold" className="text-base tracking-widest" style={{ color: BG }}>
            AGREGAR AL CARRITO
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}
