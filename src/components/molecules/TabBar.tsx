import FavoritesSvg from "@/assets/expo.icon/Assets/favorites.svg";
import HomeSvg from "@/assets/expo.icon/Assets/home.svg";
import ProductsSvg from "@/assets/expo.icon/Assets/products.svg";
import ShoppingCartSvg from "@/assets/expo.icon/Assets/shopping-cart.svg";
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
        <View style={{ paddingBottom: insets.bottom }} className="bg-transparent px-6 py-3">
            <View className="flex-row justify-around items-center bg-[#F0EFDF] rounded-full px-6 py-3">
                {state.routes.map((route: any, index: number) => {
                    const isFocused = state.index === index;
                    const SvgIcon = icons[route.name];

                    const onPress = () => {
                        if (!isFocused) navigation.navigate(route.name);
                    };

                    if (!SvgIcon) return (
                        <TouchableOpacity key={route.key} onPress={onPress} className="items-center gap-1" />
                    );

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            className="items-center gap-1"
                        >
                            {SvgIcon && (
                                <SvgIcon
                                    width={24}
                                    height={24}
                                    color={isFocused ? "#99884C" : "#9CA3AF"}
                                />
                            )}
                            {isFocused && (
                                <View className="w-4 h-[2px] bg-[#99884C] rounded-full" />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}