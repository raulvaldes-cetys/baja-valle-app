import CartIconSvg from "@/assets/expo.icon/Assets/cart-icon.svg";
import { Pressable, Text, View } from "react-native";

interface CartButtonProps {
  count?: number;
  onPress?: () => void;
  color?: string;
}

export default function CartButton({ count = 0, onPress, color = "#3E3E3E" }: CartButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-10 h-10 items-center justify-center"
    >
      <CartIconSvg width={26} height={26} color={color} />
      {count > 0 && (
        <View className="absolute top-0 right-0 bg-[#993C1D] rounded-full w-4 h-4 items-center justify-center">
          <Text className="text-white text-[10px] font-bold">
            {count > 9 ? "9+" : count}
          </Text>
        </View>
      )}
    </Pressable>
  );
}