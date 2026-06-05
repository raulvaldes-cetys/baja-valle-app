import CartButton from "@/components/atoms/Cart";
import SearchInput from "@/components/atoms/SearchInput";
import { Skeleton } from "@/components/atoms/Skeleton";
import FavoritesGrid from "@/components/organisms/FavoritesGrid";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function FavoritesScreen() {
    const insets = useSafeAreaInsets();
    const [search, setSearch] = useState("");
    const isLoading = false;
    const favoritesData: any[] = [];

    const filteredFavorites = favoritesData.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView className="flex-1 bg-[#512432]">
            <ScrollView
                className="bg-[#F0EFDF]"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
            >
                <View className="bg-[#512432] pt-12 pb-8">
                    <Text className="text-center text-3xl font-bold tracking-widest text-[#FFFFFF] px-3 mb-3 pb-5">
                        PRODUCTOS FAVORITOS
                    </Text>

                    <View className="flex-row items-center px-4 gap-2 mb-2">
                        <SearchInput
                            placeholder="Buscar producto..."
                            value={search}
                            onChangeText={setSearch}
                        />
                        <CartButton count={0} light/>
                    </View>
                </View>

                <View className="mt-2">
                    {isLoading ? (
                        <View className="px-4 mt-4">
                            {Array.from({ length: 3 }).map((_, row) => (
                                <View key={row} className="flex-row gap-2 mt-3">
                                    {[0, 1].map((col) => (
                                        <View key={col} className="flex-1 m-1 gap-2">
                                            <Skeleton height={160} width="100%" />
                                            <Skeleton height={12} width="85%" />
                                            <Skeleton height={12} width="60%" />
                                            <Skeleton height={1} width="100%" />
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    ) : (
                        <FavoritesGrid
                            products={filteredFavorites}
                            onFavoritePress={(id) => console.log("quitar favorito", id)}
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}