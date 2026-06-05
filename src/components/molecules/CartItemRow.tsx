import DeleteIconSvg from "@/assets/expo.icon/Assets/delete-icon.svg";
import MinusIconSvg from "@/assets/expo.icon/Assets/minus-icon.svg";
import PlusIconSvg from "@/assets/expo.icon/Assets/plus-icon.svg";
import { ThemedText } from "@/components/atoms/ThemedText";
import { useProductCart } from "@/contexts/ProductCartContext";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/product";
import { Image, Pressable, View } from "react-native";

interface CartItemRowProps {
  item: Product;
  onRemove?: (item: Product) => void;
}

export default function CartItemRow({ item, onRemove }: CartItemRowProps) {
  const { removeFromCart, setProductQuantity } = useProductCart();
  const qty = item.Quantity ?? 1;
  const unit = Number(item.price) || 0;
  const total = unit * qty;

  return (
    <View>
      <View className="flex-row px-4 py-4">
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

        <View className="flex-1 justify-between">
          <ThemedText weight="semibold" className="text-[#33232C] text-[13px] pb-3">
            {item.name}
          </ThemedText>

          <ThemedText weight="regular" className="text-[#33232C] text-xs pb-1">
            {unit > 0 ? `$${unit.toFixed(2)} C/U` : "Precio estimado"}
          </ThemedText>
          <View className="flex-row items-center self-start rounded-[15px] border border-[#33232C] px-3 py-1.5">
            <Pressable onPress={() => setProductQuantity(item.id, qty + 1)} hitSlop={8}>
              <PlusIconSvg width={11} height={11} color="#33232C" />
            </Pressable>
            <ThemedText weight="regular" className="text-[#33232C] text-sm px-4 text-center min-w-[28px]">
              {qty}
            </ThemedText>
            <Pressable onPress={() => qty > 1 && setProductQuantity(item.id, qty - 1)} hitSlop={8}>
              <MinusIconSvg width={11} height={11} color="#33232C" />
            </Pressable>
          </View>
        </View>

        <View className="items-end justify-between self-stretch ml-3">
          <ThemedText weight="semibold" className="text-[#33232C] text-[13px]">
            {total > 0 ? formatPrice(total) : "—"}
          </ThemedText>
          <Pressable onPress={() => onRemove ? onRemove(item) : removeFromCart(item.id)} hitSlop={12} className="pb-1.5">
            <DeleteIconSvg width={14} height={16} color="#33232C" />
          </Pressable>
        </View>
      </View>

      <View className="h-px bg-[#33232C] mx-4" />
    </View>
  );
}
