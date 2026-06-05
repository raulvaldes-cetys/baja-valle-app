import { ThemedButton } from "@/components/atoms/ThemedButton";
import { ThemedText } from "@/components/atoms/ThemedText";
import CartItemRow from "@/components/molecules/CartItemRow";
import { useProductCart } from "@/contexts/ProductCartContext";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/product";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_BAR_HEIGHT = 72;
const BOTTOM_SHEET_HEIGHT = 156;
const UNDO_DURATION = 5000;

export default function ShoppingCartScreen() {
  const { cartItems, removeFromCart, addToCart } = useProductCart();
  const insets = useSafeAreaInsets();
  const bottomOffset = insets.bottom + TAB_BAR_HEIGHT - 10;

  const [removedItem, setRemovedItem] = useState<Product | null>(null);
  const undoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const grandTotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (item.Quantity ?? 1),
    0
  );

  function handleRemove(item: Product) {
    removeFromCart(item.id);
    setRemovedItem(item);
    if (undoTimer.current) clearTimeout(undoTimer.current);
    undoTimer.current = setTimeout(() => setRemovedItem(null), UNDO_DURATION);
  }

  function handleUndo() {
    if (!removedItem) return;
    addToCart(removedItem);
    setRemovedItem(null);
    if (undoTimer.current) clearTimeout(undoTimer.current);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#512432]" edges={["top"]}>
      <View className="flex-1">
        <View className="bg-[#512432] px-6 py-4">
          <ThemedText weight="bold" className="text-white text-2xl tracking-[4px] text-center">
            MI CARRITO
          </ThemedText>
        </View>

        <ScrollView
          className="flex-1 bg-white"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: BOTTOM_SHEET_HEIGHT + bottomOffset, flexGrow: 1 }}
        >
          {cartItems.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <ThemedText weight="bold" className="text-[#512432] text-lg text-center px-16">
                No hay ningun producto en el carrito
              </ThemedText>
            </View>
          ) : (
            <View className="p-4">
              {cartItems.map((item) => (
                <CartItemRow key={item.id} item={item} onRemove={handleRemove} />
              ))}
            </View>
          )}
        </ScrollView>

        <View
          className="absolute left-0 right-0"
          style={{ bottom: 0 }}
        >
          {removedItem && (
            <View className="bg-white flex-row items-center justify-center px-4 py-2 gap-2">
              <ThemedText weight="regular" className="text-[#33232C] text-sm">
                Producto eliminado del carrito
              </ThemedText>
              <Pressable onPress={handleUndo}>
                <ThemedText weight="semibold" className="text-[#33232C] text-sm underline">
                  Deshacer
                </ThemedText>
              </Pressable>
            </View>
          )}

          <View
            className="bg-[#512432] px-6 pt-5"
            style={{ paddingBottom: bottomOffset + 16 }}
          >
          <View className="flex-row justify-between mb-3.5">
            <ThemedText weight="bold" className="text-white text-sm">
              Estimado total:*
            </ThemedText>
            <ThemedText weight="semibold" className="text-white text-sm">
              {formatPrice(grandTotal)}
            </ThemedText>
          </View>

          <ThemedButton variant="pill" className="mb-4" disabled={cartItems.length === 0} onPress={() => router.push('/(tabs)/cart-checkout')}>
            SOLICITAR COTIZACIÓN
          </ThemedButton>

          <ThemedText weight="light" className="text-white text-[10px] text-center">
            Los precios mostrados son estimados*
          </ThemedText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
