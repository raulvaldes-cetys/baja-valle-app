import CartButton from "@/components/atoms/Cart";
import SearchInput from "@/components/atoms/SearchInput";
import FavoritesGrid from "@/components/organisms/FavoritesGrid";
import { useFavorites } from "@/contexts/FavoritesContext";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function FavoritesScreen() {
    const insets = useSafeAreaInsets();
    const [search, setSearch] = useState("");
    const { favorites, removeFavorite } = useFavorites();

    const filteredFavorites = favorites.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView className="flex-1 bg-[#512432]" edges={["top"]}>
            <View className="flex-1 bg-[#F9F9F2]">
            <ScrollView
                className="bg-[#F9F9F2]"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
            >
                <View className="bg-[#512432] pt-8 pb-8 px-6">
                    <Text className="text-center text-2xl font-bold tracking-widest text-[#FFFFFF] mb-3 pb-5">
                        PRODUCTOS FAVORITOS
                    </Text>

                    <View className="flex-row items-center gap-2 mb-2">
                        <SearchInput
                            placeholder="Buscar producto..."
                            value={search}
                            onChangeText={setSearch}
                        />
                        <CartButton
                            count={0}
                            color="white"
                            onPress={() => router.navigate('/(tabs)/shoppingCart')}
                        />
                    </View>
                </View>

                <View className="mt-2">
                    <FavoritesGrid
                        products={filteredFavorites}
                        onFavoritePress={(id) => removeFavorite(id)}
                    />
                </View>
            </ScrollView>
            </View>
        </SafeAreaView>
    );
}
