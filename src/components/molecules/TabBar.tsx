import FavoritesSvg from "@/assets/expo.icon/Assets/favorites.svg";
import HomeSvg from "@/assets/expo.icon/Assets/home.svg";
import ProductsSvg from "@/assets/expo.icon/Assets/products.svg";
import ShoppingCartSvg from "@/assets/expo.icon/Assets/cart-icon.svg";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const icons: Record<string, any> = {
    index: HomeSvg,
    products: ProductsSvg,
    shoppingCart: ShoppingCartSvg,
    favorites: FavoritesSvg,
};


// Solo se muestran con una sesión iniciada
const SIGNED_IN_ONLY = ["favorites", "profile"];

type TabBarProps = {
    state: any;
    descriptors: any;
    navigation: any;
};

export default function TabBar({ state, descriptors, navigation }: TabBarProps) {
    const insets = useSafeAreaInsets();
    const { user } = useAuth();

    return (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: insets.bottom }} className="bg-transparent px-6 py-3">
            <View
                className="flex-row justify-between items-center bg-[#F9F9F2] rounded-full px-6 py-3"
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.12,
                    shadowRadius: 12,
                    elevation: 8,
                }}
            >
                {state.routes.map((route: any, index: number) => {
                    const isFocused = state.index === index;
                    const SvgIcon = icons[route.name];
                    const isProfile = route.name === "profile";
                    const iconColor = isFocused ? "#99884C" : "#9CA3AF";

                    const onPress = () => {
                        if (!isFocused) navigation.navigate(route.name);
                    };

                    if (!user && SIGNED_IN_ONLY.includes(route.name)) return null;
                    if (!SvgIcon && !isProfile) return null;

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            className="items-center"
                        >
                            {isProfile ? (
                                <Ionicons name="person-outline" size={24} color={iconColor} />
                            ) : (
                                <SvgIcon width={24} height={24} color={iconColor} />
                            )}
                            <View
                                className={`w-8 h-[2px] rounded-full ${isFocused ? "bg-[#99884C]" : "bg-transparent"}`}
                                style={{ position: 'absolute', bottom: -6 }}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}