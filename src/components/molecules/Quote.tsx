import { ThemedText } from "@/components/atoms/ThemedText";
import { useState } from "react";
import { Pressable, View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface QuoteProps {
  productName: string;
  onAddToCart?: (quantity: number) => void;
}

const QUANTITIES = [100, 500, 1000, 5000];

export default function Quote({
  productName,
  onAddToCart,
}: QuoteProps) {
  const [quantity, setQuantity] = useState(1000);
  const [open, setOpen] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View className="flex-1 bg-[#4A1628] px-12" style={{ minHeight: 400 }}>
      {/* Ondas de abajo */}
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <Svg width="100%" height="100" viewBox="0 0 390 80">
          <Path
            d="M0,10 C60,40 120,-20 195,10 C270,40 330,-20 390,10 L390,80 L0,80 Z"
            fill="rgba(255,255,255,0.08)"
          />
          <Path
            d="M0,25 C80,-10 160,40 240,15 C310,-5 360,25 390,20 L390,80 L0,80 Z"
            fill="rgba(255,255,255,0.05)"
          />
        </Svg>
      </View>

      <View className="flex-1 justify-center pb-20">
        {/* Título */}
        <ThemedText weight="bold" className="text-white text-2xl text-center mb-6">
          ¡COTIZA AHORA!
        </ThemedText>

        {/* Dropdown cantidad de unidades */}
        <View className="flex-row items-center gap-10 mb-8">
          <View className="border border-gray-400 rounded px-6 py-3 bg-transparent">
            <Pressable onPress={() => setOpen(!open)}>
              <ThemedText weight="regular" className="text-white text-sm">
                {quantity.toLocaleString()} ▾
              </ThemedText>
            </Pressable>
            {open && (
              <View className="absolute top-10 left-0 bg-white rounded shadow z-10 w-24">
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
          <ThemedText weight="semibold" className="text-white text-base flex-1">
            {productName}
          </ThemedText>
        </View>

        {/* boton agregar carrito */}
        <Pressable
          onPress={() => onAddToCart?.(quantity)}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          className="border border-white rounded-full py-3 items-center"
          style={{ backgroundColor: isPressed ? "rgba(255,255,255,0.2)" : "transparent" }}
        >
          <ThemedText weight="bold" className="text-white text-base tracking-widest">
            AGREGAR AL CARRITO
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}