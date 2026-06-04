import { ThemedText } from "@/components/atoms/ThemedText";
import { useProductCart } from "@/contexts/ProductCartContext";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/product";
import { Image, Pressable, View } from "react-native";

interface CartItemRowProps {
  item: Product;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { removeFromCart, setProductQuantity } = useProductCart();
  const qty = item.Quantity ?? 1;
  const unit = item.price ?? 0;
  const total = unit * qty;

  return (
    <View>
      <View className="flex-row items-center px-4 py-3.5">
        <View className="w-[79.24px] h-[79.24px] rounded-[10px] overflow-hidden bg-[#E8E3D9] mr-3">
          {item.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="flex-1" />
          )}
        </View>

        <View className="flex-1">
          <ThemedText weight="semibold" className="text-[#33232C] text-[13px] mb-0.5">
            {item.name}
          </ThemedText>
          <ThemedText weight="regular" className="text-[#33232C] text-xs mb-2">
            {unit > 0 ? `$${unit.toFixed(2)} C/U` : "Precio estimado"}
          </ThemedText>

          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center rounded-[15px] border border-[#33232C] px-2 py-0.5">
              <Pressable
                onPress={() => qty > 1 && setProductQuantity(item.id, qty - 1)}
                hitSlop={8}
              >
                <ThemedText weight="semibold" className="text-[#33232C] text-base px-1">
                  -
                </ThemedText>
              </Pressable>
              <ThemedText weight="regular" className="text-[#33232C] text-[13px] px-2 min-w-[28px] text-center">
                {qty}
              </ThemedText>
              <Pressable
                onPress={() => setProductQuantity(item.id, qty + 1)}
                hitSlop={8}
              >
                <ThemedText weight="semibold" className="text-[#33232C] text-base px-1">
                  +
                </ThemedText>
              </Pressable>
            </View>

            <Pressable onPress={() => removeFromCart(item.id)}>
              <ThemedText weight="regular" className="text-[#33232C] text-xs underline">
                Eliminar
              </ThemedText>
            </Pressable>
          </View>
        </View>

        <ThemedText weight="semibold" className="text-[#33232C] text-[13px] ml-2">
          {total > 0 ? formatPrice(total) : "—"}
        </ThemedText>
      </View>

      <View className="h-px bg-[#33232C] mx-4" />
    </View>
  );
}
