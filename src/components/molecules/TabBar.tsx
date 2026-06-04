import FavoritesSvg from "@/assets/expo.icon/Assets/favorites.svg";
import HomeSvg from "@/assets/expo.icon/Assets/home.svg";
import ProductsSvg from "@/assets/expo.icon/Assets/products.svg";
import ShoppingCartSvg from "@/assets/expo.icon/Assets/cart-icon.svg";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const icons: Record<string, any> = {
    index: HomeSvg,
    products: ProductsSvg,
    shoppingCart: ShoppingCartSvg,
    favorites: FavoritesSvg,
};


type TabBarProps = {
    state: any;
    descriptors: any;
    navigation: any;
};

export default function TabBar({ state, descriptors, navigation }: TabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: insets.bottom }} className="bg-transparent px-6 py-3">
            <View
                className="flex-row justify-between items-center bg-[#F0EFDF] rounded-full px-6 py-3"
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

                    const onPress = () => {
                        if (!isFocused) navigation.navigate(route.name);
                    };

                    if (!SvgIcon) return null;

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            className="items-center"
                        >
                            {SvgIcon && (
                                <SvgIcon
                                    width={24}
                                    height={24}
                                    color={isFocused ? "#99884C" : "#9CA3AF"}
                                />
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