import BajaValleLogo from "@/assets/expo.icon/Assets/bajaValleLOGO.svg";
import { ThemedButton } from "@/components/atoms/ThemedButton";
import { ThemedText } from "@/components/atoms/ThemedText";
import CartItemRow from "@/components/molecules/CartItemRow";
import { useProductCart } from "@/contexts/ProductCartContext";
import { formatPrice } from "@/lib/utils";
import { ScrollView, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_BAR_HEIGHT = 72;
const BOTTOM_SHEET_HEIGHT = 156;

export default function ShoppingCartScreen() {
  const { cartItems } = useProductCart();
  const insets = useSafeAreaInsets();
  const bottomOffset = insets.bottom + TAB_BAR_HEIGHT;

  const grandTotal = cartItems.reduce(
    (acc, item) => acc + (item.price ?? 0) * (item.Quantity ?? 1),
    0
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F0EFDF]" edges={["top"]}>
      <View className="flex-1">
        <View className="bg-[#F0EFDF] items-center pt-1 pb-3">
          <BajaValleLogo width={200} height={150} color="#31242C" />
          <ThemedText weight="bold" className="text-[#512432] text-2xl tracking-[4px] text-center">
            MI CARRITO
          </ThemedText>
        </View>

        <ScrollView
          className="flex-1 bg-white"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: BOTTOM_SHEET_HEIGHT + bottomOffset }}
        >
          {cartItems.length === 0 ? (
            <View className="py-16 items-center">
              <ThemedText weight="regular" className="text-[#33232C] text-sm text-center">
                Tu carrito está vacío
              </ThemedText>
            </View>
          ) : (
            cartItems.map((item) => <CartItemRow key={item.id} item={item} />)
          )}
        </ScrollView>

        <View
          className="absolute left-0 right-0 bg-[#512432] px-6 pt-5 pb-4"
          style={{ bottom: bottomOffset }}
        >
          <View className="flex-row justify-between mb-3.5">
            <ThemedText weight="regular" className="text-white text-sm">
              Estimado total:*
            </ThemedText>
            <ThemedText weight="semibold" className="text-white text-sm">
              {formatPrice(grandTotal)}
            </ThemedText>
          </View>

          <ThemedButton variant="pill" className="mb-2.5">
            SOLICITAR COTIZACIÓN
          </ThemedButton>

          <ThemedText weight="light" className="text-white text-[10px] text-center">
            Los precios mostrados son estimados*
          </ThemedText>
        </View>
      </View>
    </SafeAreaView>
  );
}
