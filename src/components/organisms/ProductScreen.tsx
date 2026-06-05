import BajaValleLogo from "@/assets/expo.icon/Assets/bajaValleLOGO.svg";
import CartButton from "@/components/atoms/Cart";
import SearchInput from "@/components/atoms/SearchInput";
import CategoryNav from "@/components/organisms/CategoryNav";
import ProductGrid from "@/components/organisms/ProductGrid";
import { Skeleton } from "@/components/atoms/Skeleton";
import { useGetCategoriesList } from "@/services/queries/use-get-categories-list";
import { useGetProductsList } from "@/services/queries/use-get-products-list";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const DEFAULT_CATEGORY_ID = 3;

export default function ProductScreen() {
  const insets = useSafeAreaInsets();
  const { categoryId: categoryIdParam } = useLocalSearchParams<{ categoryId?: string }>();

  const [activeCategoryApiId, setActiveCategoryApiId] = useState<number>(DEFAULT_CATEGORY_ID);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const parsedId = Number(categoryIdParam);
    if (parsedId > 0) setActiveCategoryApiId(parsedId);
  }, [categoryIdParam]);

  const { data: productsData, isLoading } = useGetProductsList();
  const { data: categoriesData } = useGetCategoriesList();

  const filteredProducts = (productsData?.products ?? []).filter(
    (p) =>
      p.categoryId === activeCategoryApiId &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeLabel = categoriesData?.categories?.find((c) => c.id === activeCategoryApiId)?.name ?? "";

  return (
    <SafeAreaView className="flex-1 bg-[#F0EFDF]" edges={["top"]}>
      <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
      >
        <View className="bg-[#F0EFDF]">
          <View className="items-center pt-4 pb-1">
            <BajaValleLogo width={200} height={150} color="#31242C" />
          </View>

          <Text className="text-center text-3xl font-bold tracking-widest text-[#7B2D2D] px-3 mb-3">
            NUESTROS PRODUCTOS
          </Text>

          <View className="flex-row items-center px-4 gap-2 mb-2">
            <SearchInput
              placeholder="Buscar producto..."
              value={search}
              onChangeText={setSearch}
            />
            <CartButton count={0} onPress={() => router.navigate('/(tabs)/shoppingCart')} />
          </View>

          <CategoryNav
            activeApiId={activeCategoryApiId}
            onCategoryChange={(apiId) => {
              setActiveCategoryApiId(apiId);
              setSearch("");
            }}
          />
        </View>

        <View className="mt-2 bg-white">
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
            <ProductGrid title={activeLabel} products={filteredProducts} />
          )}
        </View>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}
